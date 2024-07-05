import { View, Text , TouchableOpacity } from 'react-native'
import React from 'react'
import MenuNavBar from '../components/MenuNavBar';
import { Icon } from '@rneui/themed';
import BotonCuadrado from '../components/BotonCuadrado';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import BotoneraStats from '../views/BotoneraStats';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

const UserStatsMenu = () => {

  const navigation = useNavigation();

  useEffect(() => {
    const setUpBarColors = async () => {
        StatusBar.setBackgroundColor('#36BFF9');
        NavigationBar.setBackgroundColorAsync("white");
        }
    setUpBarColors();
  }, []);

  return (
    <View>
     
     {/* NavBar */}

     <MenuNavBar>
        <View className="flex-row justify-between w-full px-4">
            <View className="w-5"/>
            <View className="text-center justify-center">
                <Text className="text-white text-2xl text-center font-bold ">Día 461</Text>
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
            <TouchableOpacity>
                <BotonCuadrado name="Peso"/>
            </TouchableOpacity>

            <TouchableOpacity>
                <BotonCuadrado name="Crear Ejercicio"/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate({name:"ConfigRoutines"})}>
                <BotonCuadrado name="Configurar Rutinas"/>
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
     




    </View>
  )
}

export default UserStatsMenu