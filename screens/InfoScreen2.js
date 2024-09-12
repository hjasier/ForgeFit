import { View, Text , Image } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native';
import { Icon } from '@rneui/base'


const InfoScreen2 = () => {

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle('dark-content', true);
            StatusBar.setBackgroundColor('#F3F3F2', true);
        }, [])
    );

    const navigation = useNavigation();


  return (
    <SafeAreaView className="items-center py-16 px-6">
        <Text className="text-[#36BFF9] font-black text-4xl ">
            Macros
        </Text>

        <View className="py-8">

        
            <View className="items-center space-y-4">
                <Text className=" text-center">
                    En ForgeFit puedes encontrar alimentos de 3 fuentes diferentes:
                </Text>

                <Text className="text-center font-black text-3xl text-[#36BFF9]">
                    1
                </Text>
            </View>


            <View className="items-center space-y-4 mt-4">
                <Text className=" text-center">
                    Los alimentos que tu añadas manualmente 
                </Text>

                <Text className="text-center font-black text-3xl text-[#36BFF9]">
                    2
                </Text>
            </View>

            <View className="items-center space-y-4 mt-4">
                <View className="items-center">
                    <Text className=" text-center">
                        Base de datos de <Text className="font-bold">OpenFoodFacts</Text>
                    </Text>
                    <Text className="text-gray-400 py-1">
                        (Centrada en Productos)
                    </Text>
                </View>

                <Text className="text-center font-black text-3xl text-[#36BFF9]">
                    3
                </Text>

                <View className="items-center">
                    <Text className=" text-center">
                        Base de datos de <Text className="font-bold">Nutritionix</Text>
                    </Text>
                    <Text className="text-gray-400 py-1">
                        (Centrada en comidas preparadas)
                    </Text>
                </View>
            </View>




        </View>



        <TouchableOpacity onPress={() => navigation.navigate("InfoScreen3")} className="mt-14 bg-[#36BFF9] py-3 px-6 rounded-md flex-row space-x-3">
            <Text className="text-white font-bold">
                Siguiente
            </Text>
            <Icon size={18} name="arrow-right" type="font-awesome-5" color="white" />

        </TouchableOpacity>


    </SafeAreaView>
  )
}

export default InfoScreen2