import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useDatabase } from '../hooks/DatabaseContext'
import { useState } from 'react'


const SetWeight = () => {

   const navigation = useNavigation();
   const db = useDatabase();

   const [data, setData] = useState([]);
   const [weight, setWeight] = useState(0);

   useEffect(() => {
     const getWeightData = async () => {
         if (db) {
            const query = `SELECT * FROM weight ORDER BY date DESC;`;
            const result = await db.getAllAsync(query);
         }
      }

        getWeightData();
    }, []);

    const handleSaveNewWeight = async () => {
        const query = `INSERT INTO weight (weight) VALUES (?);`;
        const values = [weight];
        await db.runAsync(query, values);
        navigation.goBack();
    }


  return (
    <SafeAreaView>

      <View className="flex-row items-center justify-center space-x-4 mt-20">
        <Text>Peso</Text>
        <TextInput keyboardType='numeric' onChangeText={setWeight} placeholder="Peso" className="w-32 justify-center text-center  rounded-md h-10 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>
      </View>

    <View className="items-center mt-4">
      <TouchableOpacity onPress={handleSaveNewWeight} className="bg-[#171717] w-36 h-10 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-4">
        <Text className="text-white">Guardar</Text>
      </TouchableOpacity>
    </View>

    <View>
        {}
    </View>

    
    </SafeAreaView>
  )
}

export default SetWeight