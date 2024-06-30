import { View, Text } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'

const NutrientLevel = ({name, icon , level , value , iconType}) => {


  //level types : low, moderate, high


  const levelColor = (level) => {
    if (level == "low") {
      return "#00B528"
    }
    if (level == "moderate") {
      return "#E85F25"
    }
    if (level == "high") {
      return "#D52D2D"
    }
    return "#000"
  }

  const levelCol = levelColor(level);

  if (!value) {
    value = level;
  }

  return (
    <View className="flex-row justify-between mt-3">
        <View className="flex-row space-x-7">
            <Icon type={iconType} name={icon} size={24} color="black" />
            <Text>{name}</Text>
        </View>
        <View className="flex-row space-x-1 just items-center">
            <View style={{backgroundColor:levelCol}} className="w-3 h-3 rounded-full"/>
            <Text>{value}</Text>
        </View>
    </View>
  )
}

export default NutrientLevel