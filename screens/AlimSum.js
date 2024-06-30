import { View, Text , Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome ,AntDesign , Octicons ,Entypo } from '@expo/vector-icons'

const AlimSum = () => {
  return (
    <SafeAreaView>
    <View className="justify-center items-center py-5 flex flex-col justify-between space-y-5 ">


      <Text className="text-base">Colacao</Text>

      <Image source={require('../assets/testImg.png')} className="h-20 w-20 rounded-md"/>


      {/* Stats */}
      <View className="flex flex-row">
            <View className="bg-[#36BFF9] w-20 h-10 rounded-l-xl items-center justify-center flex-row">
                <Text className="text-white font-bold ">200</Text>
                <Text className="text-white px-1">kcal</Text>
            </View>
            <View className="bg-[#FF4E4E] w-20 h-10 items-center justify-center flex-row">
                <Text className="text-white font-bold">6.8</Text>
                <Text className="text-white px-1">g</Text>
            </View>
            <View className="bg-[#FFC34E] w-20 h-10 rounded-r-xl items-center justify-center flex-row">
                <Text className="text-white font-bold ">7.2</Text>
                <Text className="text-white px-1">g</Text>
            </View>
      </View>

      <Text className="text-blue-600">Ver más</Text>



      {/* Btns */}
      <View className="pt-10">

      
      <View className=" flex flex-row items-center justify-between space-x-3">
        <Text className="text-base">Cantidad</Text>

        <TextInput  keyboardType="numeric" placeholder="200 ml" className="justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>
        <TextInput  keyboardType="numeric" placeholder="1" className="justify-center text-center rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-2"/>

      </View>


      <View className="flex-row items-center justify-center space-x-2 mt-4">
        <TouchableOpacity className="w-12 h-9 bg-gray-800 rounded-lg items-center justify-center">
            <Entypo name="minus" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity className="w-12 h-9 bg-gray-800 rounded-lg items-center justify-center">
            <Octicons name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>


      <View className="mt-20">
        <TouchableOpacity className="bg-[#171717] h-12 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-4">
            <Text className="text-white">Añadir alimento</Text>
        </TouchableOpacity>
      </View>


      </View>





    </View>
    </SafeAreaView>
  )
}

export default AlimSum