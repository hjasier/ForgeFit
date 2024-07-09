import { View, Text , TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import MenuNavBar from '../components/MenuNavBar';
import { Icon } from '@rneui/themed';
import BotonCuadrado from '../components/BotonCuadrado';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import BotoneraStats from '../views/BotoneraStats';
import { useNavigation , useIsFocused, useFocusEffect } from '@react-navigation/native';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useState } from 'react';
import { useDatabase } from '../hooks/DatabaseContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomStatusBar from '../components/CustomStatusBar';



const UserStatsMenu = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const db = useDatabase();
  const [weight, setWeight] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  

  useEffect(() => {
    const getWeight = async () => {
        const query = `SELECT * FROM weight ORDER BY date DESC LIMIT 1;`;
        const result = await db.getAllAsync(query);
        result[0] && setWeight(result[0].weight);
    }
    getWeight();
    }, [isFocused]);


    useEffect(() => {
        const getTotalDays = async () => {
            const query = `SELECT * FROM user WHERE id = 0 LIMIT 1;`;
            const result = await db.getAllAsync(query);
            console.log(result[0].creationDate);
            const daysSinceCreation = Math.floor((new Date() - new Date(result[0].creationDate)) / (1000 * 60 * 60 * 24));
            result[0] && setTotalDays(daysSinceCreation);

        }
        getTotalDays();
    }
    , [isFocused]);


    useFocusEffect(
        useCallback(() => {
          StatusBar.setBarStyle('dark-content', true);
          StatusBar.setBackgroundColor('#36BFF9', true);
        }, [])
    );

    

  return (
    <SafeAreaView>

     
     {/* NavBar */}

     <MenuNavBar>
        <View className="flex-row justify-between w-full px-4">
            <View className="w-5"/>
            <View className="text-center justify-center">
                <Text className="text-white text-2xl text-center font-bold ">Día {totalDays}</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("ConfigMenu")} className="h-full justify-center ">
                <Icon color={"white"} type='font-awesome-5' name="cogs" className="w-5"/>
            </TouchableOpacity>
        </View>
     </MenuNavBar> 

     {/* Stats */}

    <View className="items-center pt-8 px-5">

    
        <View className="w-80 h-40 bg-white "></View>

        <View className="flex-row space-x-2 mt-3">
            <TouchableOpacity onPress={() => navigation.navigate("SetWeight")}>
                <BotonCuadrado icon="weight" iconType={"material-community"} name={`Peso ${weight} kg`}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("ExAdd")}>
                <BotonCuadrado icon="plus-square" iconType={"font-awesome-5"} name="Crear Ejercicio"/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate({name:"ConfigRoutines"})}>
                <BotonCuadrado icon="calendar-plus-o" iconType={"font-awesome"} name="Configurar Rutinas"/>
            </TouchableOpacity>
            
        </View>
        
        <ScrollView className="w-full h-96 mt-4">
            <BotoneraStats/>
        </ScrollView>

        <View className="flex-row space-x-2 items-center justify-center mt-4">
            <Text>Temporizador entre ejs</Text>
            <TextInput value="90" className="w-14 justify-center text-center  rounded-md h-9 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>

        </View>

            

    </View>
     




    </SafeAreaView>
  )
}

export default UserStatsMenu