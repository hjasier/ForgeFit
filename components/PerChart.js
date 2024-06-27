import { PieChart } from "react-native-gifted-charts";
import { View, Text } from 'react-native'
import React from 'react'

const pieData = [
    {value: 30, color: 'lightgray'},
    {value: 70, color: '#34C4F1'}
];

const ChartTest = ({kcalToday,kcalTotal}) => {
  return (
    <View>
            <PieChart
                isAnimated
                donut
                radius={60}
                innerRadius={50} 
                data={pieData}
                centerLabelComponent={() => 
                  {
                return <View className="flex items-center">
                <Text className="font-bold text-xl"> {kcalToday}</Text>
                <Text className="font-medium text-xl"> {kcalTotal}</Text>
                <Text className="text-gray-400 text-xl"> kcal</Text>



                </View>
              ;
                }}
            />
    </View>
  )
}

export default ChartTest



    
