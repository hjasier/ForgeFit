import { View, Text , TextInput, TouchableOpacity ,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { useDatabase } from '../hooks/DatabaseContext'
import { useNavigation } from '@react-navigation/native'


const CreateRoutine = () => {

  const [name , setName] = useState("");
  const db = useDatabase();
  const navigation = useNavigation();

  const handleSaveRoutine = async () => {
    if (name !== "") {
        try {
            if (db) {
              const query = `SELECT * FROM routines WHERE name = ?;`;
              const values = [name];
              const result = await db.getAllAsync(query, values);
              if (result.length === 0) {
                const query = `
                  INSERT INTO routines 
                  (name,imgSRC)
                  VALUES (?,?)
                `;
                const values = [name, "imgSOURCE"];
                await db.runAsync(query, values);
              }
            }
          } catch (error) {
            console.error("Error al insertar rutina", error);
            return;
          }
          finally {
            navigation.goBack();
          }
    }
  }


  return (
    <SafeAreaView className="py-10">

    <Text className="pb-10 items-center text-center">Crear Nueva Rutina</Text>
    <View className="items-center">

    <TextInput 
      value={name}
      onChangeText={setName}
      placeholder="Nombre de la rutina" 
      className="w-52 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>

    <TouchableOpacity className="bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 rounded-md p-3 mt-10">
      <Image className="w-20 h-20" source={require('../assets/testEx.png')}/>
    </TouchableOpacity>

    <TouchableOpacity onPress={handleSaveRoutine} className="px-3 bg-[#171717] h-12 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-16">
      <Text className="text-white">Guardar cambios</Text>
    </TouchableOpacity>

    

    </View>


    </SafeAreaView>
  )
}

export default CreateRoutine