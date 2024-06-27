import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MacrosMain from '../screens/MacrosMain'


import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed'

import White from '../screens/White';



const Tab = createBottomTabNavigator()

const TabNavigator = () => {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  return (
    <Tab.Navigator 
    initialRouteName="Home"
    screenOptions={({route}) => ({
      tabBarActiveTintColor: '#36BFF9',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel: false,
      tabBarIcon: ({focused , color , size }) => {

        if (route.name === 'Macros') {
          return <Icon name="check-circle" type="feather" color={focused ? "red":"gray"} />
        } 
        else if (route.name === 'White1') {
          return <Icon name="check-circle" type="feather" color={focused ? "red":"gray"} />
        }
        else if (route.name === 'White2') {
          return <Icon name="check-circle" type="feather" color={focused ? "red":"gray"} />
        }
      }

    })}>

      <Tab.Screen name="Macros" component={MacrosMain} options={{headerShown:false}}/>
      <Tab.Screen name="White1" component={White} options={{headerShown:true}} />
      <Tab.Screen name="White2" component={White} options={{headerShown:false}}/>


    </Tab.Navigator>
  )
}

export default TabNavigator