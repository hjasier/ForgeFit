import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConsumSearch from '../components/ConsumSearch';
import { useDatabase } from '../hooks/DatabaseContext';
import axios from 'axios';
import { nutrixApiId, nutrixApiKey } from '../keys';
import CustomStatusBar from '../components/CustomStatusBar';

const SearchAlim = () => {
  const db = useDatabase();
  const taskNameInputRef = useRef();

  const [search, setSearch] = useState('');
  const [alimListPersonal, setAlimListPersonal] = useState([]);
  const [alimListOpenFoodFacts, setAlimListOpenFoodFacts] = useState([]);
  const [alimListNutrionix, setAlimListNutrionix] = useState([]);
  const [alimList, setAlimList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);

  const options = ['Todos', 'Mios', 'OpenFoodFacts', 'Nutrionix'];
  const debounceTimeout = useRef(null);

  // Enfoca el TextInput cuando el componente se monta
  useEffect(() => {
    setTimeout(() => {
      if (taskNameInputRef.current) {
        taskNameInputRef.current.focus();
      }
    }, 100);
  }, []);

  // Lógica combinada de búsqueda
  useEffect(() => {
    async function fetchResults() {
      if (search.length >= 3) {
        switch (selectedOption) {
          case 0:
            await sqlSearch();
            clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(async () => {
              await offSearch();
            }, 400);
            debounceTimeout.current = setTimeout(async () => {
              await nutrionixSearch();
            }, 400);
            
            break;
          case 1:
            await sqlSearch();
            break;
          case 2:
            clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(async () => {
              await offSearch();
            }, 400);
            break;
          case 3:
            clearTimeout(debounceTimeout.current);
            debounceTimeout.current = setTimeout(async () => {
              await nutrionixSearch();
            }, 400);
            break;
          default:
            break;
        }
      } else {
        if (search === '') {
          const alims = await db.getAllAsync('SELECT * FROM alims');
          setAlimList(alims);
        }
      }
    }

    fetchResults();
    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [search, selectedOption]);

  // Combina los resultados basados en la opción seleccionada
  useEffect(() => {
    switch (selectedOption) {
      case 0:
        setAlimList([...alimListPersonal, ...alimListOpenFoodFacts, ...alimListNutrionix]);
        break;
      case 1:
        setAlimList(alimListPersonal);
        break;
      case 2:
        setAlimList(alimListOpenFoodFacts);
        break;
      case 3:
        setAlimList(alimListNutrionix);
        break;
      default:
        setAlimList([]);
    }
  }, [alimListPersonal, alimListOpenFoodFacts, alimListNutrionix, selectedOption]);

  // Busca en la base de datos local
  const sqlSearch = async () => {
    const words = search.split(' ');
    const conditions = words.map(word => `name LIKE '%${word}%'`).join(' AND ');
    const query = `SELECT * FROM alims WHERE ${conditions};`;
    const alims = await db.getAllAsync(query);
    setAlimListPersonal(alims);
  };

  // Busca en OpenFoodFacts
  const offSearch = async () => {
    try {
      const params = {
        search_terms: search,
        search_simple: 1,
        action: 'process',
        json: 1,
        page_size: 20,
      };
      
      const response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', { params });
      const alims = response.data.products.map(product => ({
        id: product.id,
        name: product.product_name,
        barCode: product.barcode,
        kcals: product.nutriments['energy-kcal_100g'],
        protein: product.nutriments.proteins_100g,
        carbs: product.nutriments.carbohydrates_100g,
        fat: product.nutriments.fat_100g,
        saturated: product.nutriments['saturated-fat_100g'],
        fiber: product.nutriments.fiber_100g,
        sugars: product.nutriments.sugars_100g,
        salt: product.nutriments.salt_100g,
        sodium: product.nutriments.sodium_100g,
        potassium: product.nutriments.potassium_100g,
        cholesterol: product.nutriments.cholesterol_100g,
        weight: 100,
        unit: 'g',
        alimGroup: null,
        brand: product.brands,
        imgSRC: product.image_url,
        uploadSRC: 'OFF',
        isAPIResult: true,
      }));

      setAlimListOpenFoodFacts(alims);
    } catch (err) {
      console.error(err);
    }
  };



  // Busca en Nutrionix
  const nutrionixSearch = async () => {
    try {
      const apiUrl = 'https://trackapi.nutritionix.com/v2/search/instant';
      const headers = {
        'Content-Type': 'application/json',
        'x-app-id': nutrixApiId,
        'x-app-key': nutrixApiKey,
        'x-remote-user-id': '0',
      };
      const locale = 'es_ES';

      const response = await axios.post(apiUrl, { query: search, locale }, { headers });
      const alims = response.data.common.map(product => ({
        id: product.food_name,
        name: product.food_name,
        barCode: null,
        kcals: product.nf_calories,
        protein: product.nf_protein,
        carbs: product.nf_total_carbohydrate,
        fat: product.nf_total_fat,
        saturated: product.nf_saturated_fat,
        fiber: product.nf_dietary_fiber,
        sugars: product.nf_sugars,
        salt: product.nf_sodium,
        sodium: product.nf_sodium,
        potassium: product.nf_potassium,
        cholesterol: product.nf_cholesterol,
        weight: 100,
        unit: 'g',
        alimGroup: null,
        brand: null,
        imgSRC: product.photo.thumb,
        uploadSRC: 'Nutrionix',
        isAPIResult: true,
      }));

      setAlimListNutrionix(alims);
            
    } catch (err) {
      console.error('Error al buscar productos en Nutrionix. Por favor, intenta de nuevo.');
    }
  };



  return (
    <SafeAreaView className="my-2">

      <View className="px-8 mt-4">
        <TextInput
          onChangeText={setSearch}
          ref={taskNameInputRef}
          placeholder="🔍 Buscar"
          className="rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-6"
        />
      </View>

      <View className="flex-row mt-5 space-x-1 items-center justify-center">
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`bg-[#EAEAEA] h-9 px-4 justify-center items-center rounded-2xl ${selectedOption === index ? 'bg-[#FFD700] shadow-md shadow-yellow-300' : ''}`}
            onPress={() => setSelectedOption(index)}
          >
            <Text className="text-xs">{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView className="px-5 mt-5">
        <View className="pb-28">
          {alimList.map(alim => (
            <ConsumSearch alim={alim} key={`${alim.id}_${alim.uploadSRC}`} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchAlim;
