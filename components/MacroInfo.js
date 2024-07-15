import { View, Text } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';
import { TextInput } from 'react-native-gesture-handler';

const MacroInfo = ({name,icon,unit,value,setValue,iconType}) => {
  return (
    <View className="flex-row justify-between mt-2">
        <View className="flex-row space-x-5">
            <View className="items-center w-8">
              <Icon type={iconType} name={icon} size={22} color="black" />
            </View>
            <Text>{name}</Text>
        </View>
        <View className="flex-row space-x-1 items-center">
            <TextInput keyboardType='numeric' onChangeText={setValue} className="p-0">{value}</TextInput>
            <Text> {unit}</Text>
        </View>
    </View>
  )
}

export default MacroInfo