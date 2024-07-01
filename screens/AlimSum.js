import { View, Text , Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome ,AntDesign , Octicons ,Entypo } from '@expo/vector-icons'
import { useNavigation  } from '@react-navigation/native';
import { useState } from 'react';
import { useDatabase } from '../hooks/DatabaseContext'


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


  const insertConsum = async () => {
    try {
      if (db) {
        const query = `
          INSERT INTO consums 
          (hour , day , month, year , alimId, weight, unit)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          new Date().getHours(),
          new Date().getDate(),
          new Date().getMonth(),
          new Date().getFullYear(),
          alim.id,
          consumWeight,
          consumUnits
        ];
        await db.runAsync(query, values);

        const updatedAlims = await db.getAllAsync('SELECT * FROM consums');
        console.log(updatedAlims);
      }
    } catch (error) {
      console.error("Error al insertar el consumo:", error);
      return;
    } finally {
      navigation.navigate("Macros");
    }
  
  }

  const handleStoreConsum = () => {
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
                <Text className="text-white font-bold ">{alim.kcals}</Text>
                <Text className="text-white px-1">kcal</Text>
            </View>
            <View className="bg-[#FF4E4E] w-20 h-10 items-center justify-center flex-row">
                <Text className="text-white font-bold">{alim.protein}</Text>
                <Text className="text-white px-1">g</Text>
            </View>
            <View className="bg-[#FFC34E] w-20 h-10 rounded-r-xl items-center justify-center flex-row">
                <Text className="text-white font-bold ">{alim.carbs}</Text>
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