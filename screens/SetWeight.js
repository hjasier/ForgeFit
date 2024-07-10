import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useDatabase } from '../hooks/DatabaseContext'
import { useState } from 'react'
import { LineChart } from "react-native-gifted-charts";



const SetWeight = () => {

   const navigation = useNavigation();
   const db = useDatabase();

   const [data, setData] = useState([]);
   const [weight, setWeight] = useState(0);

   useEffect(() => {
     const getWeightData = async () => {
         if (db) {
            const query = `SELECT * FROM weight ORDER BY date ASC;`;
            const result = await db.getAllAsync(query);
            setData(result);
         }
      }

        getWeightData();
    }, []);

    const handleSaveNewWeight = async () => {
        const query = `INSERT INTO weight (weight) VALUES (?);`;
        const values = [weight];
        await db.runAsync(query, values);
        navigation.goBack();
    }

    const lineData = [{value: 0},{value: 10},{value: 8},{value: 58},{value: 56},{value: 78},{value: 74},{value: 98}];

    const weightData = data.map((item) => {
        return {value: item.weight}
    });


  return (
    <SafeAreaView>

      <View className="flex-row items-center justify-center space-x-4 mt-20">
        <Text>Peso</Text>
        <TextInput keyboardType='numeric' onChangeText={setWeight} placeholder="Peso" className="w-32 justify-center text-center  rounded-md h-10 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>
      </View>

    <View className="items-center mt-4">
      <TouchableOpacity onPress={handleSaveNewWeight} className="bg-[#171717] w-36 h-10 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-4">
        <Text className="text-white">Guardar</Text>
      </TouchableOpacity>
    </View>


    {weightData.length > 0 &&
    <View className="mt-10 px-8">
    <LineChart
        
            areaChart
            curved
            data={weightData}
            height={400}
            spacing={1}
            initialSpacing={2}
            color1="skyblue"
            color2="orange"
            textColor1="green"
            hideDataPoints
            dataPointsColor1="blue"
            startFillColor1="skyblue"
            startOpacity={0.8}
            endOpacity={0.3}
            isAnimated 
            domain={{ min: 0, max: Math.max(...weightData.map(item => item.value)) }}
            formatYLabel={(label) => label + ' kg'}
            yAxisOffset={55}
            trimYAxisAtTop={true}
            yAxisExtraHeight={75 - 70}
            maxValue={12}
            
            />
    </View>
    }

    
    </SafeAreaView>
  )
}

export default SetWeight