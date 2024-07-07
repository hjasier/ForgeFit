import { View, Text , Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome ,AntDesign , Octicons ,Entypo } from '@expo/vector-icons'
import { useNavigation  } from '@react-navigation/native';
import { useState } from 'react';
import { useDatabase } from '../hooks/DatabaseContext'
import CryptoJS from 'crypto-js';
import moment from 'moment'

const AlimSum = ({ route }) => {

  const alim = route.params.alim;

  const navigation = useNavigation();
  const db = useDatabase();

  const [consumWeight, setConsumWeight] = useState(alim.weight);
  const [consumUnits, setConsumUnits] = useState(1);
  

  const handleAlterWeight = (text) => {
    if (!text || text < 0) {
      text = 0;
    }
    setConsumWeight(text);
    setConsumUnits(parseFloat(text)/alim.weight);
  }

  const handleAlterUnits = (text) => {
    if (!text || text < 0) {
      text = 0;
    }
    setConsumUnits(text);
    setConsumWeight(parseFloat(text)*alim.weight);
  }

  const generateHash = (inputString) => {
    let hash = 0;
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convertimos a 32-bit integer
    }
    // Aseguramos que el resultado sea positivo y obtenemos los últimos 5 dígitos
    const positiveHash = Math.abs(hash);
    const shortId = ('00000' + positiveHash % 100000).slice(-5);
    return shortId;
  }


  const insertConsum = async () => {
    try {
      if (db) {
        const query = `
          INSERT INTO consums 
          (date , alimId, weight, unit)
          VALUES (?, ?, ?, ?)
        `;
        const values = [
          moment().format('YYYY-MM-DD HH:mm:ss'),
          alim.id,
          consumWeight,
          consumUnits
        ];
        await db.runAsync(query, values);

        const updatedAlims = await db.getAllAsync('SELECT * FROM consums');
      }
    } catch (error) {
      console.error("Error al insertar el consumo:", error);
      return;
    } finally {
      navigation.navigate("Macros");
    }
  
  }


  const checkAlimExists = async () => {
    try {
      if (db) {
        const query = `SELECT * FROM alims WHERE id = ?;`;
        const values = [alim.id];
        const result = await db.getAllAsync(query, values);
        if (result.length == 0) {
          const query = `
            INSERT INTO alims 
            (id, name, barCode, kcals, protein, carbs, fat, saturated, fiber, sugars, salt, sodium, potassium, cholesterol, weight, unit, alimGroup, brand, imgSRC, uploadSRC)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
          `;
          if (alim.uploadSRC == "Nutrionix") {
            alim.id = generateHash(alim.name);
          }
          const values = [
            alim.id,
            alim.name,
            alim.barCode,
            alim.kcals,
            alim.protein,
            alim.carbs,
            alim.fat,
            alim.saturated,
            alim.fiber,
            alim.sugars,
            alim.salt,
            alim.sodium,
            alim.potassium,
            alim.cholesterol,
            alim.weight,
            alim.unit,
            alim.alimGroup,
            alim.brand,
            alim.imgSRC,
            alim.uploadSRC
          ];

          await db.runAsync(query, values);
        }
        else {
          console.log("El alimento ya existe en la base de datos UPDATE LLL");
        }
      }
    } catch (error) {
      console.error("Error al insertar el alimento:", error);
      return;
    }
  }
        


  const handleStoreConsum = () => { 

    console.log("API RESULT: "+alim.isAPIResult);

    if(alim.isAPIResult){
      checkAlimExists();
    }
    insertConsum();
    navigation.navigate("Macros");
  }


  return (
    <SafeAreaView>
    <View className="justify-center items-center py-5 flex flex-col justify-between space-y-5 ">


      <Text className="text-base">{alim.name}</Text>

      <Image source={{uri:alim.imgSRC}} className="h-20 w-20 rounded-md"/>


      {/* Stats */}
      <View className="flex flex-row">
            <View className="bg-[#36BFF9] w-20 h-10 rounded-l-xl items-center justify-center flex-row">
                <Text className="text-white font-bold ">{parseFloat((alim.kcals * consumUnits).toFixed(2))}</Text>
                <Text className="text-white px-1">kcal</Text>
            </View>
            <View className="bg-[#FF4E4E] w-20 h-10 items-center justify-center flex-row">
                <Text className="text-white font-bold">{parseFloat((alim.protein * consumUnits).toFixed(2))}</Text>
                <Text className="text-white px-1">g</Text>
            </View>
            <View className="bg-[#FFC34E] w-20 h-10 rounded-r-xl items-center justify-center flex-row">
                <Text className="text-white font-bold ">{parseFloat((alim.carbs * consumUnits).toFixed(2))}</Text>
                <Text className="text-white px-1">g</Text>
            </View>
      </View>

      <TouchableOpacity>
        <Text className="text-blue-600">Ver más</Text>
      </TouchableOpacity>


      {/* Btns */}
      <View className="pt-10">

      
      <View className=" flex flex-row items-center justify-between space-x-3">
        <Text className="text-base">Cantidad</Text>

        <TextInput 
        onChangeText={(text) => handleAlterWeight(text)}
        value={consumWeight.toString()}  
        keyboardType="numeric" 
        placeholder={alim.weight+" "+alim.unit} 
        className="justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>
        
        
        <TextInput  
        onChangeText={(text) => handleAlterUnits(text)}
        value={consumUnits.toString()}
        placeholder="1"
        keyboardType="numeric"  className="justify-center text-center rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-2"/>

      </View>


      <View className="flex-row items-center justify-center space-x-2 mt-4">
        <TouchableOpacity onPress={() => handleAlterUnits(consumUnits-1)} className="w-12 h-9 bg-gray-800 rounded-lg items-center justify-center">
            <Entypo name="minus" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleAlterUnits(consumUnits+1)} className="w-12 h-9 bg-gray-800 rounded-lg items-center justify-center">
            <Octicons name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>


      <View className="mt-20">
        <TouchableOpacity onPress={handleStoreConsum} className="bg-[#171717] h-12 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-4">
            <Text className="text-white">Guardar consumo</Text>
        </TouchableOpacity>
      </View>


      </View>





    </View>
    </SafeAreaView>
  )
}

export default AlimSum