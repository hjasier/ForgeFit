import { PieChart } from "react-native-gifted-charts";
import { View, Text } from 'react-native'
import React from 'react'


const ChartTest = ({kcalToday,kcalTotal}) => {
  
  const pieData = [
    {value: kcalTotal-kcalToday, color: 'lightgray'},
    {value: kcalToday, color: '#34C4F1'},
  ];
  
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



    
