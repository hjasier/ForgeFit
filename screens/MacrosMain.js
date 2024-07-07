import { View, Text , TouchableOpacity, TouchableHighlight } from 'react-native'
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


export default function MacrosMain() {
  
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const db = useDatabase();

  const goals = {
    protein: 88,
    carbs: 400,
    kcals: 2814
  }

  const [todayMacros, setTodayMacros] = useState({kcals: 0, protein: 0, carbs: 0});


  const updateMacros = async () => {
    try {
      if (db) {
        const query = `
          SELECT 
          SUM(c.weight * a.kcals / a.weight) AS kcals,
          SUM(c.weight * a.protein / a.weight) AS protein,
          SUM(c.weight * a.carbs / a.weight) AS carbs
          FROM consums c
          JOIN alims a ON c.alimId = a.id
          WHERE c.day = ?
            AND c.month = ?
            AND c.year = ?;
        `;
        const values = [new Date().getDate(), new Date().getMonth(), new Date().getFullYear()];
  
        // Uso de db.get para obtener un solo resultado
        const result = await db.getAllAsync(query, values);

        if (result && result[0] && result[0].kcals !== null && result[0].protein !== null && result[0].carbs !== null) {
          
          // Formatear cada valor de result[0] a 2 decimales
          const formattedResult = {
            kcals: parseFloat(result[0].kcals.toFixed(2)),
            protein: parseFloat(result[0].protein.toFixed(2)),
            carbs: parseFloat(result[0].carbs.toFixed(2))
          };
          setTodayMacros(formattedResult);
        }
        

      }
    } catch (error) {
      console.error("Error al obtener las calorías totales consumidas:", error);
      return null;
    }
  };


  useEffect(() => {
    if (db){
      updateMacros();
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      if (db){
        updateMacros();
      }
    }, [db])
  );


  useEffect(() => {
    const setUpBarColors = async () => {
        StatusBar.setBackgroundColor('#F5F5F5');
        NavigationBar.setBackgroundColorAsync("white");
        }
    setUpBarColors();
  }, [isFocused]);




  return (
    <SafeAreaView>
      
      <TouchableOpacity onPress={updateMacros} className="px-5">
        <FontAwesome className="" name="history" size={24} color="black" />
      </TouchableOpacity>

      {/* Stats */}
      <View className="items-center">

        <PerChart kcalToday={todayMacros.kcals} kcalTotal={goals.kcals}/>

        <BrChart header="Proteína" colorT="#FF4E4E" curToday={todayMacros.protein} total={goals.protein}/>
        <BrChart header="Carbohidratos" colorT="#FFC34E" curToday={todayMacros.carbs} total={goals.carbs}/>

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

      <TouchableOpacity onPress={() => navigation.navigate("SearchAlim")}>
      <View  className="items-center w-full px-5 mt-3 items-center justify-center">

        <View className="w-full text-center justify-center bg-[#EAEAEA] h-12 rounded-lg shadow-md shadow-gray-800 ">
          
          <View className="flex flex-row px-4">
            <FontAwesome name="search" size={16} color="#171717" />
            <Text className="ml-3 text-[#171717]">Buscar Alimento</Text>

          </View>
        </View>


      </View>
      </TouchableOpacity>






    </SafeAreaView>
  )
}