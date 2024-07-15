import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, BackHandler } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MacroInfo from '../components/MacroInfo';
import NutrientLevel from '../components/NutrientLevel';
import { useDatabase } from '../hooks/DatabaseContext';
import { FontAwesome } from '@expo/vector-icons';

const MacrosInfo = ({ route }) => {
  let data = route.params.data;

  if (route.params.backData){
    data = route.params.backData;
  }

  const product = data.product;


  const navigation = useNavigation();

  const [serving, setServing] = useState(100);
  const [servingUnit, setServingUnit] = useState("g");
  const [recalculatedNutrients, setRecalculatedNutrients] = useState({});
  const [image, setImage] = useState(product.image_front_url);

  //Macros

  const [kcal, setKcal] = useState(product.nutriments["energy-kcal_100g"]);
  const [protein, setProtein] = useState(product.nutriments.proteins_100g);
  const [carbs, setCarbs] = useState(product.nutriments.carbohydrates_100g);
  const [fat, setFat] = useState(product.nutriments.fat_100g);
  const [fiber, setFiber] = useState(product.nutriments.fiber_100g);
  const [sodium, setSodium] = useState(product.nutriments.sodium_100g);
  
  const db = useDatabase();

  useEffect(() => {
    if (data.status === 0) {
      return <View className="w-full h-full items-center justify-center">Producto no encontrado</View>
    }
   // quantity and unit are not always present
    if (product.product_quantity_unit) {
      setServingUnit(product.product_quantity_unit);
    }
    if (product.product_quantity) {
      setServing(product.product_quantity);
    }
    setRecalculatedNutrients(product.nutriments);
  }, [product]);

  const [name , setName] = useState(product.product_name);


  useEffect(() => {
    // Recalcular nutrientes
    const ratio = serving / 100;
    const newNutrients = {};
    for (const key in product.nutriments) {
      if (typeof product.nutriments[key] === 'number') {
        newNutrients[key] = parseFloat((product.nutriments[key] * ratio).toFixed(2));
      } else {
        newNutrients[key] = product.nutriments[key];
      }
    }
    setRecalculatedNutrients(newNutrients);
  }, [serving]);

  const insertAlim = async () => {
    try {
      if (db) {
        const query = `
          INSERT INTO alims 
          (name, protein, kcals, carbs, fat, saturated, weight, sodium, sugars, brand, barcode, imgSRC, uploadSRC, unit) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          name,
          recalculatedNutrients.proteins_100g,
          recalculatedNutrients["energy-kcal_100g"],
          recalculatedNutrients.carbohydrates_100g,
          recalculatedNutrients.fat_100g,
          recalculatedNutrients["saturated-fat_100g"],
          serving,
          recalculatedNutrients.sodium_100g,
          recalculatedNutrients.sugars_100g,
          product.brands,
          product.code,
          image,
          "OFF",
          servingUnit
        ];

        await db.runAsync(query, values);

        const updatedAlims = await db.getAllAsync('SELECT * FROM alims');
      }
    } catch (error) {
      console.error("Error al insertar el alimento:", error);
      return;
    } finally {
      navigation.navigate("Macros");
    }
  };

  const handleSaveAlim = () => {
    insertAlim();
    navigation.navigate("Macros");
  };

  const handleUpdateServing = (text) => {
    const newServing = parseFloat(text) || 0;
    setServing(newServing);
  };

  // En vez de ir hacia atrás, ir al home de macros
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Macros");
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation])
  );

  const handleImagePress = () => {
    navigation.navigate("TakeImg" , {returnPath: "MacrosInfo" , backData: data});
  };

  useEffect(() => {
    if (route.params?.imgSRC) {
      setImage(route.params.imgSRC);

    }
  }, [route.params]);


  
  return (
    <SafeAreaView>
      <View className="items-center py-10 flex-row items-center justify-center space-x-5">

        {/* Imagen */}
        
        <TouchableOpacity onPress={handleImagePress}>
        {
        
        
        image ? (

          <Image source={{ uri: image }} className="w-20 h-20 rounded-lg" />

        ): (
          <View className="w-20 h-20 rounded-lg border-2 border-black items-center justify-center " >
            <FontAwesome name="image" size={18} color="black" />
          </View>
        )

        }

        
          
        </TouchableOpacity>
        
        <View className="items-center justify-center space-y-2">
          <TextInput
            onChangeText={setName}
            placeholder={product.product_name}
            value={name}
            className="bg-[#EAEAEA] h-8 w-40 rounded-md text-center justify-center shadow-md shadow-gray-700"
          />
          <Text className="text-gray-400 justify-center ">{product.brands}</Text>
          <View className="flex-row space-x-3 justify-center items-center">
            <View className="bg-green-600 w-3 h-3 rounded-full" />
            <Text>aquivaelscore</Text>
          </View>
        </View>
      </View>

      <View className="px-12">
        <View className="flex-row justify-between mb-4">
          <Text>Info</Text>
          <View className="flex-row space-x-2 items-center">
            <Text>Serving</Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={handleUpdateServing}
              placeholder="100"
              value={serving.toString()}
              className="bg-[#EAEAEA] h-8 w-16 rounded-md text-center justify-center shadow-md shadow-gray-700"
            />
          </View>
        </View>

        {/* Sugars */}
        <NutrientLevel name="Azúcares" icon="spoon-sugar" iconType="material-community" level={product.nutrient_levels.sugars} value={recalculatedNutrients.sugars_100g + " g"} />

        {/* Salt */}
        <NutrientLevel name="Sal" iconType={"material-community"} icon="shaker" level={product.nutrient_levels.salt} value={recalculatedNutrients.salt_100g + " g"} />

        {/* Saturated Fat */}
        <NutrientLevel name="Grasas Saturadas" iconType={"font-awesome-5"} icon="hamburger" level={product.nutrient_levels["saturated-fat"]} value={recalculatedNutrients["saturated-fat_100g"] + " g"} />

        <Text className="mt-8 mb-3">Información Nutricional</Text>

        <ScrollView className="h-40">
          <View className="space-y-2">
            {/* Kcal */}
            <MacroInfo key={"nutri-kcal"} name="Kcal" icon="fire" iconType={"font-awesome-5"} unit="kcal" setValue={setKcal} value={kcal} />

            {/* Protein */}
            <MacroInfo key={"nutri-protein"} name="Proteina" icon="drumstick-bite" iconType={"font-awesome-5"} unit="g" setValue={setProtein} value={protein} />

            {/* Carbs */}
            <MacroInfo key={"nutri-carbs"} name="Carbohidratos" icon="rice" iconType={"material-community"} unit="g" setValue={setCarbs} value={carbs} />

            {/* Fats */}
            <MacroInfo key={"nutri-fats"} name="Grasas" icon="bacon" iconType={"font-awesome-5"} unit="g" setValue={setFat} value={fat} />

            {/* Fiber */}
            <MacroInfo key={"nutri-fiber"} name="Fibra" icon="leaf" iconType={"font-awesome-5"} unit="g" setValue={setFiber} value={fiber} />

            {/* Sodium */}
            <MacroInfo key={"nutri-sodium"} name="Sodio" icon="prescription-bottle" iconType={"font-awesome-5"} unit="mg" setValue={setSodium} value={sodium} />
          </View>
        </ScrollView>
      </View>

      <View className="px-20 py-10">
        <TouchableOpacity onPress={handleSaveAlim} className="bg-[#171717] h-12 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-4">
          <Text className="text-white">Guardar Alimento</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default MacrosInfo;
