import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const MacroInfo = ({name,icon,unit,value}) => {
  return (
    <View className="flex-row justify-between mt-2">
        <View className="flex-row space-x-7">
            <FontAwesome name="star" size={24} color="black" />
            <Text>{name}</Text>
        </View>
        <View className="flex-row space-x-1">
            <Text>{value}</Text>
            <Text> {unit}</Text>
        </View>
    </View>
  )
}

export default MacroInfo