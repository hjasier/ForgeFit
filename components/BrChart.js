import { View, Text } from 'react-native'
import { BarChart } from "react-native-gifted-charts";
import React from 'react'


const barData = [
    {value: 500, label: 'Proteina', frontColor: '#177AD5'},
];


const BrChart = ({header,colorT,total ,curToday}) => {
  return (
    <View className="p-2">
    
    {/* Texto */}
    <View style={{width:200}} className="flex flex-row justify-between items-center pb-1">
        <Text className="text-left">{header}</Text> 
        <Text className="text-right">{curToday}/{total}g</Text>
    </View>


    {/* Barra */}
    <View style={{width:200}} className="bg-gray-200 h-4 relative rounded-full">
    <View style={{width:200*(curToday/total),backgroundColor:colorT}} className=" h-4 rounded-full absolute"/>
    
    </View>
  </View>
  )
}

export default BrChart
 
