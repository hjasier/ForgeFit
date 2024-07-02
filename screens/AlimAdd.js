import { View, Text , TouchableOpacity , Image} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation , useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { useDatabase } from '../hooks/DatabaseContext';
import axios from 'axios';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { SERAPIKEY } from '../keys';
const AlimAdd = () => {

  const db = useDatabase();

  const [alimName, setAlimName] = useState('');
  const [kcals, setKcals] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [weight, setWeight] = useState('');
  const [imgSRC, setImgSRC] = useState('');
  const [unit, setUnit] = useState('g');

  const [loading, setLoading] = useState(false);
  const [loadingIMG, setLoadingIMG] = useState(false);


  const navigation = useNavigation();
  const route = useRoute();

  const taskNameInputRef = useRef();

  unitBG = unit === "g" ? "#1D1D1D" : "#EAEAEA";
  unitBGR = unit === "g" ? "#EAEAEA" : "#1D1D1D";

  // Función para enfocar el TextInput cuando se monta el componente o se muestra el modal
  const focusTaskNameInput = () => {
    if (taskNameInputRef.current) {
      taskNameInputRef.current.focus();
    }
  };


  // Llama a la función cuando el componente se monta o el modal se muestra
  useEffect(() => {
    setTimeout(() => {
      focusTaskNameInput();
    }, 100);
  }, []);


  const insertAlim = async () => {
    setLoading(true);
    try {
      if (db) {
        const query = `
          INSERT INTO alims 
          (name, protein, kcals, carbs, fat, weight, imgSRC, uploadSRC , unit) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ? ,?)
        `;
        const values = [alimName, protein, kcals, carbs, fat, weight, imgSRC, "user", unit];
        await db.runAsync(query, values);

        const updatedAlims = await db.getAllAsync('SELECT * FROM alims');
        console.log(updatedAlims);
      }
    } catch (error) {
      console.error("Error al insertar el alimento:", error);
      return;
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  };

  const getAlimImg = async () => {

    if ((imgSRC && !imgSRC.includes("API")) || !alimName || alimName.trim()==="") {return;}

    setLoadingIMG(true);

    try {
      const bilbaoCoordinates = '43.2630126,-2.9349852'; 

      const apiUrl = `https://serpapi.com/search?engine=google_images&q=${encodeURIComponent(alimName)}&ijn=0&hl=es&gl=es&geo=${bilbaoCoordinates}&api_key=${SERAPIKEY}`;
  
      const response = await axios.get(apiUrl);
  
      // Obtener la URL de la primera imagen de los resultados
      if (response.data && response.data.images_results && response.data.images_results.length > 0) {
        const firstImage = response.data.images_results[0].original;

        // Guardar la imagen en el sistema de archivos
        const appImagePath = `${FileSystem.documentDirectory}photos/`;
        const fileName = `photo_API_${Date.now()}.jpg`; // Nombre único basado en la fecha actual
        const newFilePath = appImagePath + fileName;

        // Descargar la imagen y guardarla en el sistema de archivos
        await FileSystem.makeDirectoryAsync(appImagePath, { intermediates: true });
        await FileSystem.downloadAsync(firstImage, newFilePath);

        setImgSRC(newFilePath);
        console.log('Imagen guardada en: ', newFilePath);
        setLoadingIMG(false);
      } else {
        setImgSRC(null);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
    
  }

  const takeImg = () => {
    navigation.navigate("TakeImg" ,{returnPath: "AlimAdd"});
  }


  useEffect(() => {
    // Verifica si hay parámetros al volver de TakeImg
    if (route.params?.imgSRC) {
      setImgSRC(route.params.imgSRC);
    }
  }, [route.params]);


  return (

    <SafeAreaView>
        <View className="px-11 py-11">


            <View className="flex-row justify-between items-center ">

            <TextInput 
            value={alimName}
            onChangeText={setAlimName}
            onEndEditing={() => {getAlimImg()}}
            ref={taskNameInputRef} placeholder="Nombre del alimento" className="w-48 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>


              <TouchableOpacity className="bg-[#EAEAEA] rounded-lg w-14 h-14 shadow-md shadow-gray-800 " onPress={takeImg}>
                
                <View className="bg-[#EAEAEA] rounded-lg w-14 h-14 shadow-md items-center justify-center">
                { imgSRC ? (
                  <>
                  <Image source={{ uri: imgSRC }} className="bg-[#EAEAEA]  w-14 h-14 rounded-lg absolute" />
                  
                  {
                    loadingIMG ? (
                      <FontAwesome name="spinner" size={18} color="white" />
                    ) : (
                      <FontAwesome name="image" size={18} color="white" />
                    )
                  }
                  
                  </>
                  
              
                ) : (
                
                  <>
                  {
                    loadingIMG ? (
                      <FontAwesome name="spinner" size={18} />
                    ) : (
                      <FontAwesome name="image" size={18} />
                    )
                  }
                  </>
                )
                }
              </View>
              </TouchableOpacity>
            </View>


            <View className="mt-8 items-center">
            <View className=" items-start justify-between space-y-4">

                
                <View className="flex-row justify-center items-center justify-between space-x-8">
                    <Text className="text-start items-start">Kcals</Text>
                    <TextInput  
                    value={kcals}
                    onChangeText={setKcals}
                    keyboardType="numeric" 
                    placeholder="Kcal" className="w-24 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>
                </View>

                <View className="flex-row justify-center items-center justify-between space-x-8">
                    <Text>Proteína</Text>
                    <TextInput  
                    value={protein}
                    onChangeText={setProtein} 
                    keyboardType="numeric"
                    placeholder="Proteína" className="w-24 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>
                </View>

                <View className="flex-row justify-center items-center justify-between space-x-8">
                    <Text>Carbohidratos</Text>
                    <TextInput 
                    value={carbs}
                    onChangeText={setCarbs} 
                    keyboardType="numeric"
                    placeholder="Carbo" className="w-20 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>
                </View>

                <View className="flex-row justify-center items-center justify-between space-x-8">
                    <Text>Grasas</Text>
                    <TextInput 
                    value={fat}
                    onChangeText={setFat} 
                    keyboardType="numeric"
                    placeholder="Carbo" className="w-20 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>
                </View>

                <View className="flex-row justify-center items-center justify-between space-x-8">
                    <Text>Peso</Text>
                    <TextInput  
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                    placeholder="Peso" className="w-20 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>
                    

                    <View className="flex-row space-x-1">
                  
                      <TouchableOpacity onPress={() => setUnit("g")}>
                        <Text style={{ backgroundColor: unitBG,color:unitBGR }} className="rounded-md w-7 h-7 items-center justify-center text-center">g</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => setUnit("ml")}>
                      <Text style={{ backgroundColor: unitBGR,color:unitBG }} className="w-7 h-7 p-1 items-center justify-center text-center rounded-md ">ml</Text>
                      </TouchableOpacity>

                    </View>
                </View>
                
                
            </View>
          </View>


        <View className="mt-8">
        {!loading ? (
            <TouchableOpacity onPress={insertAlim} className="bg-[#171717] h-12 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-4">
                <Text className="text-white">Añadir alimento</Text>
            </TouchableOpacity>
        ) : (
            <Text className="text-blue-600">Cargando...</Text>
        )
        }
        </View>
        


        </View>
    </SafeAreaView>
  )
}

export default AlimAdd