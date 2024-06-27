import { View, Text, TouchableNativeFeedback , Image , TouchableOpacity } from 'react-native'
import React from 'react'

const Consum = () => {
  return (

    <TouchableOpacity>

        <View className="bg-[#EAEAEA] h-14 w-full my-1 px-2 py-2 rounded-lg flex flex-row justify-between items-center">
            
            
            <View className="flex flex-row">

                <Image source={require('../assets/testImg.png')} className="h-10 w-10 rounded-md"/>
                
            
                <View className="flex flex-col pl-3">
                    
                    <Text>Colacao</Text>
                    

                    <View className="flex flex-row justify-between space-x-2">
                        <View className="flex flex-row">
                            <Text className="text-[#179BE6]">200</Text>
                            <Text className="pt-0.5 pl-0.5 text-gray-400 text-xs">kcal</Text>
                        </View>
                        <View className="flex flex-row">
                            <Text className="text-[#FF4E4E]">6.8</Text>
                            <Text className="pt-0.5 pl-0.5 text-gray-400 text-xs">g</Text>
                        </View>

                        <View className="flex flex-row">
                            <Text className="text-[#FFC34E]">7.2</Text>
                            <Text className="pt-0.5 pl-0.5 text-gray-400 text-xs">kcal</Text>
                        </View>
                    </View>

                </View>

            </View>




            
            <Text className="px-1 text-gray-500">200 ml</Text>


        </View>


    </TouchableOpacity>


  )
}

export default Consum