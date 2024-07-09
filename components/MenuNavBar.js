import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';
import { useNavigation , useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';


const menuNavBar = ({name,children}) => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  


  useEffect(() => {
    if (isFocused) {
      StatusBar.setBackgroundColor('#36BFF9'); // Cambia el color de fondo
    }

    return () => {
      // Restablece la configuración de la barra de estado cuando el componente se desenfoca
      StatusBar.setBackgroundColor('transparent');
    };
  }, [isFocused]);





    
  return (
    <View className="w-full h-16 flex-row bg-[#36BFF9] rounded-b-3xl">
        {children}
    </View>
  )
}

export default menuNavBar