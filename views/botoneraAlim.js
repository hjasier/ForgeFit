import { View, Text, Touchable } from 'react-native'
import React from 'react'
import { FontAwesome , MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

const BotoneraAlim = () => {
  return (
    <View className="flex-row justify-between space-x-2 px-2">
      
      {/* Añadir Alimento */}
      <TouchableOpacity className="bg-[#EAEAEA] rounded-xl h-24 items-center w-24 align-middle justify-center">
        <FontAwesome name="plus" size={24} color="black" />
        <Text className="px-3 text-center">Añadir Alimento</Text>
      </TouchableOpacity>
      
      {/* Escanear */}
      <TouchableOpacity className="bg-[#EAEAEA] rounded-xl h-24 items-center w-24 align-middle justify-center">
        <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />
        <Text className="px-3 text-center">Escanear</Text>
      </TouchableOpacity>


      {/* Crear Receta */}
      <TouchableOpacity className="bg-[#EAEAEA] rounded-xl h-24 items-center w-24 align-middle justify-center">
        <FontAwesome name="book" size={24} color="black" />
        <Text className="px-3 text-center">Crear Receta</Text>
      </TouchableOpacity>



    </View>
  )
}

export default BotoneraAlim