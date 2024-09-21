import { View, Text , Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MacrosMain from '../screens/MacrosMain'
import { useFocusEffect } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { useIsFocused } from '@react-navigation/native';


import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed'


import SearchAlim from '../screens/SearchAlim';
import SQTest from '../screens/SQTest';
import OFFTest from '../screens/OFFTest';

import MacrosInfo from '../screens/MacrosInfo';
import UserStatsMenu from '../screens/UserStatsMenu';
import ExMain from '../screens/ExMain';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const navigation = useNavigation();
  const [initialRouteName, setInitialRouteName] = useState(''); 
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true); 
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused){
      NavigationBar.setBackgroundColorAsync("white");
    }
    else{
      NavigationBar.setBackgroundColorAsync("#F3F3F2");
    }
  }, [isFocused]);




  // Obtener el último tab seleccionado de AsyncStorage
  useEffect(() => {
    const getLastTab = async () => {
      try {
        console.log('Obteniendo lastTab...');
        const lastTab = await AsyncStorage.getItem('lastTab') || 'None';
        console.log('lastTab GETEADO:', lastTab);
        if (lastTab !== 'None') {
          console.log('Hay lastTab:', lastTab);
        } else {
          console.log('No hay lastTab');
          navigation.navigate("InfoScreen1");
        }
      } catch (e) {
        console.log(e);
      }
      finally {
        setIsLoading(false);
      }
    };
    getLastTab();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

   // Si está cargando, mostrar un loader
   if (isLoading) {
     return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image 
          source={require('../assets/splash.png')} 
          style={{ width: 700, height: 700 }}
          resizeMode="contain"
        />
        <Text>Cargando...</Text>
    </View>
     );
   }

  // Update lastTab cuando cambie
  const saveLastTab = async (routeName) => {
    try {
      console.log('Guardando lastTab:', routeName);
      await AsyncStorage.setItem('lastTab', routeName);
    } catch (e) {
      console.log('Error al guardar lastTab:', e);
    }
  };
  

  return (
    <Tab.Navigator 
    initialRouteName={initialRouteName}
    screenListeners={{
      state: (e) => {
        if (firstLoad) {
          setFirstLoad(false);
        }
        else{
          const route = e.data.state.routes[e.data.state.index].name;
          saveLastTab(route);
        }
      },
    }}
    screenOptions={({route}) => ({
      tabBarActiveTintColor: '#36BFF9',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel: false,
      
      tabBarIcon: ({focused , color , size }) => {

        if (route.name === 'Macros') {
          return <Icon name="food" type="material-community" color={focused ? "#36BFF9":"gray"} />
        } 
        else if (route.name === 'UserStats') {
          return <Icon name="stats-chart" type="ionicon" color={focused ? "#36BFF9":"gray"} />
        }
        else if (route.name === 'ExMain') {
          return <Icon name="dumbbell" type="font-awesome-5" color={focused ? "#36BFF9":"gray"} />
        }
      }

    })}>

      <Tab.Screen name="Macros" component={MacrosMain} options={{headerShown:false}}/>
      <Tab.Screen name="UserStats" component={UserStatsMenu} options={{headerShown:false}} />
      <Tab.Screen name="ExMain" component={ExMain} options={{headerShown:false}}/>
      


    </Tab.Navigator>
  )
}

export default TabNavigator