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
   const [spacing, setSpacing]= useState(1);

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


    let lastMonth = '';

    const weightData = data.map((item) => {
        const currentMonth = item.date.slice(0, 7);
        let dataPoint = {
            value: item.weight,
            date: new Date(item.date).toLocaleString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' }),
            weight: item.weight,
            labelTextStyle: { color: 'lightgray', width: 60 }
        };
        
        if (currentMonth !== lastMonth) {
            const monthLabel = new Date(item.date).toLocaleString('es-ES', { month: 'short', day: 'numeric' });
            dataPoint.label = monthLabel;
            lastMonth = currentMonth; 
        }
        return dataPoint;
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
    <View className="mt-10 px-8 pb-52">
      
      <View className="items-center flex-1 flex-row items-end space-x-1 justify-end">
        <TouchableOpacity onPress={() => setSpacing(prevSpacing => prevSpacing + 1)} className="bg-[#171717] w-7 h-7 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-4">
          <Text className="text-white">+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSpacing(prevSpacing => Math.max(prevSpacing - 1, 1))} className="bg-[#171717] w-7 h-7 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-4">
          <Text className="text-white">-</Text>
        </TouchableOpacity>
      </View>
      

      <LineChart
          isAnimated
          animateOnDataChange
          animationEasing={'ease-in-out'}
          areaChart
          curved
          data={weightData}
          height={400}
          width={250}
          spacing={spacing}
          initialSpacing={1}
          thickness={3}
          color1="#0093ff"
          hideDataPoints
          startFillColor1="#0093ff"
          endFillColor="#55d3ff"
          startOpacity={0.7}
          endOpacity={0.3}
          domain={{ min: 0, max: Math.max(...weightData.map(item => item.value)) }}
          formatYLabel={(label) => label + ' kg '}
          
          yAxisOffset={55}
          yAxisThickness={0}
          xAxisType={'dashed'}
          
          trimYAxisAtTop={true}
          yAxisExtraHeight={5}
          maxValue={12}
          rotateLabel
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 2,
            pointerColor: 'lightgray',
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: items => {
              return (
                <View
                  style={{
                    height: 90,
                    width: 100,
                    justifyContent: 'center',
                    marginTop: -30,
                    marginLeft: -40,
                  }}>
                  <Text style={{color: '#0f0e0d', fontSize: 14, marginBottom:6,textAlign:'center'}}>
                    {items[0].date}
                  </Text>
  
                  <View style={{paddingHorizontal:14,paddingVertical:6, borderRadius:16, backgroundColor:'white'}}>
                    <Text style={{fontWeight: 'bold',textAlign:'center'}}>
                      {items[0].weight + ' kg'}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
    </View>
    }

    
    </SafeAreaView>
  )
}

export default SetWeight