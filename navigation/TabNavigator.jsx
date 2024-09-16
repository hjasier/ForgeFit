import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MacrosMain from '../screens/MacrosMain'


import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed'


import SearchAlim from '../screens/SearchAlim';
import SQTest from '../screens/SQTest';
import OFFTest from '../screens/OFFTest';

import MacrosInfo from '../screens/MacrosInfo';
import UserStatsMenu from '../screens/UserStatsMenu';
import ExMain from '../screens/ExMain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";


const Tab = AnimatedTabBarNavigator()

const TabNavigator = () => {
  const navigation = useNavigation();
  const [initialRouteName, setInitialRouteName] = useState('Macros'); 
  const [isLoading, setIsLoading] = useState(true); 

  // Obtener el último tab seleccionado de AsyncStorage
  useEffect(() => {
    const getLastTab = async () => {
      try {
        const lastTab = await AsyncStorage.getItem('lastTab');
        if (lastTab) {
          setInitialRouteName(lastTab); // Si hay un tab guardado, lo usamos
        }
        else {
          navigation.navigate("InfoScreen1");
        }
      } catch (e) {
        console.log(e); // Manejo de errores
      } finally {
        setIsLoading(false); // Una vez que hemos terminado, quitamos el loader
      }
    };
    getLastTab();
  }, []);

  // Esconder el header
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Si está cargando, mostrar un loader
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  // Update lastTab cuando cambie
  const saveLastTab = async (routeName) => {
    try {
      await AsyncStorage.setItem('lastTab', routeName);
    } catch (e) {
      console.log('Error al guardar lastTab:', e);
    }
  };
  

  return (
    <Tab.Navigator 
    initialRouteName={initialRouteName}
    //appearance={{floating :false,whenActiveShow : 'icon-only',dotSize: 'small',dotCornerRadius:10}}
    screenListeners={{
      state: (e) => {
        const route = e.data.state.routes[e.data.state.index].name;
        saveLastTab(route);
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