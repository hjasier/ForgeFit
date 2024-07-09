import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';
import { useNavigation , useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import CustomStatusBar from './CustomStatusBar';


const menuNavBar = ({name,children}) => {


  

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  


  // useEffect(() => {
  //   if (isFocused) {
  //     StatusBar.setBackgroundColor('#36BFF9');
  //   }

  //   return () => {
  //     StatusBar.setBackgroundColor('#F3F3F2');
  //   };
  // }, [isFocused]);




    
  return (
    <View className="w-full h-16 flex-row bg-[#36BFF9] rounded-b-3xl">
      
        {children}
    </View>
  )
}

export default menuNavBar