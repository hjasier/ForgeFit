import { View, Text , TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'


const BtnStats = ({path,iconType, icon , text}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate({name:path})} 
        className="flex-row justify-center bg-[#EAEAEA] h-14 w-full items-center px-4 rounded-lg">
        
        <View className="flex-row space-x-3 items-center">
          <Icon type={iconType} name={icon} size={24} color="black" />
          <Text className="text-base">{text}</Text>
        </View>


    </TouchableOpacity>
  )
}

export default BtnStats