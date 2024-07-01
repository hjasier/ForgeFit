import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

const menuNavBar = ({name,children}) => {
  const navigation = useNavigation();
    
  return (
    <View className="w-full h-24 pt-8 flex-row bg-[#36BFF9] rounded-b-3xl">
        {children}
    </View>
  )
}

export default menuNavBar