import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChartTest from '../components/PerChart'
import BrChart from '../components/BrChart'
import { MaterialIcons , FontAwesome } from '@expo/vector-icons';


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

      {/* Consums */}


    </SafeAreaView>
  )
}