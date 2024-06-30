import { View, Text ,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'

const MacrosInfo = () => {
  return (
    <SafeAreaView>


        <View className="items-center py-10 flex-row items-center justify-center space-x-5">

             <Image source={require('../assets/testImg.png')} className="w-20 h-20 rounded-lg " />   

            <View className="items-center justify-center space-y-2">

                <TextInput placeholder='Colcacao' value='ColaCao' className="bg-[#EAEAEA] h-8 w-36 rounded-md text-center justify-center shadow-md shadow-gray-700" />
                <Text className="text-gray-400 justify-center ">ColaCao</Text> 
                
                <View className="flex-row space-x-3 justify-center items-center">
                    <View className="bg-green-600 w-3 h-3 rounded-full"/>
                    <Text>Regular</Text>
                </View>
            </View>
         

          
        </View>

        <View className=" px-12">

            <View className="flex-row justify-between">
                <Text >Negativo</Text>
                <Text >por 100g</Text>
            </View>


            <View className="flex-row justify-between mt-10">
                <View className="flex-row space-x-7">
                    <FontAwesome name="star" size={24} color="black" />
                    <Text>Aditivos</Text>
                </View>
                <View className="flex-row space-x-1">
                    <View className="bg-orange-600 w-3 h-3 rounded-full"/>
                    <Text>2</Text>
                </View>
            </View>


            <Text className="my-10">Información Nutricional</Text>


            <View className="flex-row justify-between mt-10">
                <View className="flex-row space-x-7">
                    <FontAwesome name="star" size={24} color="black" />
                    <Text>Kcal</Text>
                </View>
                <View className="flex-row space-x-1">
                    <Text>188</Text>
                    <Text> kcal</Text>
                </View>
            </View>



        </View>

        <View className="px-20 py-10">
            <TouchableOpacity className="bg-[#171717] h-12 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-4">
                    <Text className="text-white">Guardar Alimento</Text>
            </TouchableOpacity>
        </View>


    </SafeAreaView>



  )
}

export default MacrosInfo