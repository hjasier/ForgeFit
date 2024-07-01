import { View, Text, Touchable } from 'react-native'
import React from 'react'
import { FontAwesome , MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDatabase } from '../hooks/DatabaseContext'

const BotoneraAlim = () => {

  const navigation = useNavigation();
  const db = useDatabase();

  const dropALLTEST = async () => {
    try {
      if (db) {
        const query = `
          DROP TABLE consums;
        `;
        await db.runAsync(query);
        console.log("Tabla eliminada");
      }
    } catch (error) {
      console.error("Error eliminar tabla", error);
    } finally {
    }
  };

  return (
    <View className="flex-row justify-between space-x-2 px-2">
      
      {/* Añadir Alimento */}
      <TouchableOpacity onPress={() => navigation.navigate("AlimAdd")} className="bg-[#EAEAEA] rounded-xl h-24 items-center w-24 align-middle justify-center">
        <FontAwesome name="plus" size={24} color="black" />
        <Text className="px-3 text-center">Añadir Alimento</Text>
      </TouchableOpacity>
      
      {/* Escanear */}
      <TouchableOpacity onPress={() => navigation.navigate("Scanner")} className="bg-[#EAEAEA] rounded-xl h-24 items-center w-24 align-middle justify-center">
        <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
        <Text className="px-3 text-center">Escanear</Text>
      </TouchableOpacity>


      {/* Crear Receta */}
      <TouchableOpacity onPress={dropALLTEST} className="bg-[#EAEAEA] rounded-xl h-24 items-center w-24 align-middle justify-center">
        <FontAwesome name="book" size={24} color="black" />
        <Text className="px-3 text-center">Crear Receta</Text>
      </TouchableOpacity>



    </View>
  )
}

export default BotoneraAlim