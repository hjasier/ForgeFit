import { View, Text ,TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'

const BotonCuadrado = ({name,icon , iconType}) => {
  return (
    <View className="bg-[#EAEAEA] w-20 h-20 rounded-xl  ">
        <View className="items-center justify-center w-full h-full">
            <Icon type={iconType} name={icon} size={20} color="#000"/>
            <Text className="justify-center text-center">{name}</Text>
        </View>
      
    </View>
  )
}

export default BotonCuadrado