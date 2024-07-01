import { View, Text, TouchableNativeFeedback , Image , TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import { nutrixApiId , nutrixApiKey } from '../keys';
import { useEffect } from 'react';

const ConsumSearch = ({alim}) => {

  const navigation = useNavigation();

  //console.log(alim.uploadSRC);

  const bgColor = alim.uploadSRC === "user" ? "#F9E3C0" : "#EAEAEA";


  const fetchNutrionixDetails = async (alim) => {
    try {
      const apiUrl = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
      const headers = {
        'Content-Type': 'application/json',
        'x-app-id': nutrixApiId,
        'x-app-key': nutrixApiKey,
        'x-remote-user-id': '0',
      };

      const loc = 'es_ES';

      // 3. Hacer la llamada para obtener detalles completos
      const response = await axios.post(apiUrl, { query: alim.name, locale: loc }, { headers });

      if (response.data.foods && response.data.foods.length > 0) {
        const details = response.data.foods[0]; // Se asume que la primera coincidencia es la correcta

        // 4. Actualizar el alimento con los detalles completos
        setAlimListNutrionix((prevAlimList) => prevAlimList.map((item) =>
          item.id === alim.id ? {
            ...item,
            kcals: details.nf_calories,
            protein: details.nf_protein,
            carbs: details.nf_total_carbohydrate,
            fat: details.nf_total_fat,
            saturated: details.nf_saturated_fat,
            fiber: details.nf_dietary_fiber,
            sugars: details.nf_sugars,
            salt: details.nf_sodium,
            sodium: details.nf_sodium,
            potassium: details.nf_potassium,
            cholesterol: details.nf_cholesterol,
            detailsLoaded: true,
          } : item
        ));
      }

    } catch (error) {
      console.error(`Error en detalles de ${alim.name}:`, error);

    }
  };


  const handlePress = () => {
    if (alim.uploadSRC === "Nutrionix" && alim.isAPIResult) {
        fetchNutrionixDetails(alim);
    }
    navigation.navigate("AlimSum",{alim:alim});
  }

  return (

    <TouchableOpacity onPress={handlePress}>

        <View style={{backgroundColor:bgColor}} className="h-14 w-full my-1 px-2 py-2 rounded-lg flex flex-row justify-between items-center">
            
            
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