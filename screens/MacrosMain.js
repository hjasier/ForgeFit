import { View, Text , TouchableHighlight } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PerChart from '../components/PerChart'
import BrChart from '../components/BrChart'
import { MaterialIcons , FontAwesome } from '@expo/vector-icons';
import BotoneraAlim from '../views/BotoneraAlim'
import Consums from '../views/Consums'
import { useNavigation , useIsFocused ,useFocusEffect } from '@react-navigation/native';
import { useDatabase } from '../hooks/DatabaseContext'
import { useState , useCallback } from 'react';
import { StatusBar } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import moment from 'moment'
import { useMacros } from '../hooks/MacrosHook';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomStatusBar from '../components/CustomStatusBar'

const MacrosMain = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const macros = useMacros();

  const db = useDatabase();



  useEffect(() => {
    if (db){
      macros.updateMacros();
    }
  }, [isFocused]);


  useEffect(() => {
    if (db){
      macros.calcTodayMacros();
    }
  }, [db]);


  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content', true);
      StatusBar.setBackgroundColor('#F3F3F2', true);
    }, [])
);
  






  return (
    <SafeAreaView>

      <TouchableOpacity className="px-5">
        <FontAwesome className="" name="history" size={24} color="black" />
      </TouchableOpacity>

      {/* Stats */}
      <View className="items-center">

        <PerChart kcalToday={macros.todayMacros.kcals} kcalTotal={macros.todayGoals.kcals}/>

        <BrChart header="Proteína" colorT="#FF4E4E" curToday={macros.todayMacros.protein} total={macros.todayGoals.protein}/>
        <BrChart header="Carbohidratos" colorT="#FFC34E" curToday={macros.todayMacros.carbs} total={macros.todayGoals.carbs}/>
      
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

      <View className="px-5">
      <TouchableOpacity className="w-full text-center justify-center bg-[#EAEAEA] h-12 rounded-lg bg-[#EAEAEA] w-full  mt-3 rounded-lg shadow-md shadow-gray-800"
      onPress={() => navigation.navigate("SearchAlim")}>

          <View className="flex flex-row px-4">
            <FontAwesome name="search" size={16} color="#171717" />
            <Text className="ml-3 text-[#171717]">Buscar Alimento</Text>
          </View>
      </TouchableOpacity>
      </View>






    </SafeAreaView>
  )
}

export default MacrosMain