import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LineChart } from 'react-native-gifted-charts';

const ChartStat = ({rutina}) => {

  const lineData = [{value: 0},{value: 10},{value: 8},{value: 58},{value: 56},{value: 78},{value: 74},{value: 98}];
  const lineData2 = [{value: 0},{value: 20},{value: 18},{value: 40},{value: 36},{value: 60},{value: 54},{value: 85}];


  return (
    <TouchableOpacity >
        <View className="w-36 h-36 bg-slate-200 rounded-2xl items-center justify-center mr-2">
            <View className="w-48 px-7">
                <LineChart
                areaChart
                curved
                data={lineData}
                data2={lineData2}
                height={90}
                showVerticalLines
                spacing={14}
                initialSpacing={0}
                color1="skyblue"
                color2="orange"
                textColor1="green"
                hideDataPoints
                dataPointsColor1="blue"
                dataPointsColor2="red"
                startFillColor1="skyblue"
                startFillColor2="orange"
                startOpacity={0.8}
                endOpacity={0.3}
                hideYAxisText
                
                />
            </View>
    
            <Text className="-mt-4">
                {rutina.name}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

export default ChartStat