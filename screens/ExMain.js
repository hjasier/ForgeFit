import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import MenuNavBar from '../components/MenuNavBar';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation , useIsFocused} from '@react-navigation/native';
import SelectorRutina from '../components/SelectorRutina';
import ListaEjers from '../components/ListaEjers';
import { useState } from 'react';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import moment from 'moment';
import { useTimer } from '../hooks/TimerHook';
import { useDatabase } from '../hooks/DatabaseContext';

const ExMain = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const timer = useTimer();
  const db = useDatabase();

  const [rutina, setRutina] = useState(null);

  useEffect(() => {
    const setUpBarColors = async () => {
        StatusBar.setBackgroundColor('#36BFF9');
        NavigationBar.setBackgroundColorAsync("white");
        }
    setUpBarColors();
  }, [isFocused]);

  useEffect(() => {
    const getRutina = async () => {
        const query = `SELECT * FROM week WHERE id = ${moment().isoWeekday()-1}`;
        const result = await db.getAllAsync(query);
        const routineId = result[0].routine_id;
        if (routineId){
          const routine = await db.getAllAsync(`SELECT * FROM routines WHERE id = ${routineId}`);
          setRutina(routine[0]);
        }
    }
    getRutina();
  }, []);



  return (
    <SafeAreaView>

        {/* NavBar */}


        <MenuNavBar>
            <View className="justify-between flex-row w-full px-6 items-center">
              <TouchableOpacity onPress={() => navigation.navigate("ExHistoryList",{date:moment().format('YYYY-MM-DD')})}>
                <Icon className="w-15" name="history" type="font-awesome-5" color="white" />
              </TouchableOpacity>
                <TextInput className="bg-[#d9d9d92c] text-center text-white text-base h-12 w-44 rounded-lg" placeholder='Buscar Ejercicio' />
                
                <TouchableOpacity onPress={timer.reset}>
                  <Text className="w-15 font-extrabold text-xl text-white">{timer.format}</Text>
                </TouchableOpacity>
            </View>
        </MenuNavBar> 


        
        <View className="items-center mt-5 w-full px-8">
            <SelectorRutina rutina={rutina} setRutina={setRutina} />
        </View>

        <View className="items-center mt-5">
            <ListaEjers  rutina={rutina}/>
        </View>

    </SafeAreaView>
  )
}


export default ExMain