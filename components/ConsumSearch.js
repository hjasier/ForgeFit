import { View, Text, TouchableNativeFeedback , Image , TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

const ConsumSearch = ({alim}) => {

  const navigation = useNavigation();
  console.log(alim.imgSRC);

  

  
  
  return (

    <TouchableOpacity onPress={() => navigation.navigate("AlimSum",{"alimID":0})}>

        <View className="bg-[#EAEAEA] h-14 w-full my-1 px-2 py-2 rounded-lg flex flex-row justify-between items-center">
            
            
            <View className="flex flex-row">

                {
                    
                    alim.imgSRC ? (
                        <Image source={{uri: alim.imgSRC}} className="h-10 w-10 rounded-md"/>
                    ) : (
                        <Image source={require('../assets/testImg.png')} className="h-10 w-10 rounded-md"/>
                    )
                }
                
            
                <View className="flex flex-col pl-3">
                    
                    <Text>{alim.name}</Text>
                    

                    <View className="flex flex-row justify-between space-x-2">
                        <View className="flex flex-row">
                            <Text className="text-[#179BE6]">{alim.kcals}</Text>
                            <Text className="pt-0.5 pl-0.5 text-gray-400 text-xs">kcal</Text>
                        </View>
                        <View className="flex flex-row">
                            <Text className="text-[#FF4E4E]">{alim.protein}</Text>
                            <Text className="pt-0.5 pl-0.5 text-gray-400 text-xs">g</Text>
                        </View>

                        <View className="flex flex-row">
                            <Text className="text-[#FFC34E]">{alim.carbs}</Text>
                            <Text className="pt-0.5 pl-0.5 text-gray-400 text-xs">g</Text>
                        </View>

                        <Text className="px-1 text-xs text-gray-500">{alim.weight} {alim.unit}</Text>
                    </View>

                    

                </View>

            </View>


            <TouchableOpacity>
                <View className="mx-1">
                    <FontAwesome name="plus-square" size={24} color="#179BE6" />
                </View>
            </TouchableOpacity>




            
            


        </View>


    </TouchableOpacity>


  )
}

export default ConsumSearch