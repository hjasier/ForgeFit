import { View, Text , TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChartTest from '../components/PerChart'
import BrChart from '../components/BrChart'
import { MaterialIcons , FontAwesome } from '@expo/vector-icons';
import BotoneraAlim from '../views/BotoneraAlim'
import Consums from '../views/Consums'

export default function HomeScreen() {
  return (
    <SafeAreaView>

      <FontAwesome name="history" size={24} color="black" />


      {/* Stats */}
      <View className="items-center">

        <ChartTest kcalToday={991} kcalTotal={2814}/>

        <BrChart header="Proteína" colorT="#FF4E4E" curToday={47} total={88}/>
        <BrChart header="Carbohidratos" colorT="#FFC34E" curToday={67} total={88}/>

      </View>

      {/* Btns */}

      <View className="items-center mt-2">
        <BotoneraAlim/>
      </View>

      {/* Consums */}

      <View className="items-center mt-1">
        <Consums />
      </View>

      {/* Search btn*/}

      <TouchableOpacity className="items-center w-full px-5 mt-3 items-center justify-center">


        <View className="w-full text-center justify-center bg-[#EAEAEA] h-12 rounded-lg shadow-md shadow-gray-800 ">
          
          <View className="flex flex-row px-4">
            <FontAwesome name="search" size={16} color="#171717" />
            <Text className="ml-3 text-[#171717]">Buscar Alimento</Text>

          </View>
        </View>


      </TouchableOpacity>






    </SafeAreaView>
  )
}