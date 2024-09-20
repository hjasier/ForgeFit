import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { LineChart } from 'react-native-gifted-charts';
import { useDatabase } from '../hooks/DatabaseContext';
import { color } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';


const ChartStat = ({rutina}) => {

  const db = useDatabase();
  const [variation, setVariation] = useState(null); 
  const [lineData, setLineData] = useState([]);
  const [graphColor, setGraphColor] = useState('#f54646');
  const [graphInterval, setGraphInterval] = useState('35');
  const isFocused = useIsFocused();


  useEffect(() => {
    const fetchGraphInterval = async () => {
      const storedInterval = await AsyncStorage.getItem('graphInterval');
      setGraphInterval(storedInterval ? parseInt(storedInterval, 10) : 30);
    };
    fetchGraphInterval();
  }, []);

  const calculatePerformanceChange = (data) => {
    if (data.length < 2) return null;
  
    const firstWeek = data[data.length - 1].avg_weight; // Peso promedio de la primera semana
    const lastWeek = data[0].avg_weight; // Peso promedio de la última semana
  
    const percentageChange = ((lastWeek - firstWeek) / firstWeek) * 100;
    return percentageChange;
  };


  useEffect(() => { 
    if (!isFocused){ return;}
    if (db) {
      const calculateVolume = async () => {
        // Obtener la fecha actual en el formato adecuado
        const storedInterval = await AsyncStorage.getItem('graphInterval');
        setGraphInterval(storedInterval ? parseInt(storedInterval, 10) : 35);
        const currentDate = new Date().toISOString().replace('T', ' ').split('.')[0]; // Formato 'YYYY-MM-DD HH:MM:SS'
        const fiveWeeksAgo = new Date();
        fiveWeeksAgo.setDate(fiveWeeksAgo.getDate() - graphInterval);
        const startDate = fiveWeeksAgo.toISOString().replace('T', ' ').split('.')[0];

        const query = `
          SELECT 
            strftime('%Y-%m-%d', date) AS week_start,
            AVG(weight) AS average_weight
          FROM 
            sets
          WHERE 
            exercise_id IN (
              SELECT exercise_id
              FROM routine_exercises
              WHERE routine_id = ?
            )
            AND date >= ?
          GROUP BY 
            strftime('%Y-%W', date)
          ORDER BY 
            week_start;
        `;

        try {
          const result = await db.getAllAsync(query, [rutina.id, startDate]);
          //console.log('Progreso de la rutina en las últimas 5 semanas:', result);
          
          // Transformar los resultados para lineData
          const formattedData = result.map(item => ({ value: item.average_weight }));
          setLineData(formattedData);


          if (result.length > 1) {
            const firstWeekWeight = result[0].average_weight;
            const lastWeekWeight = result[result.length - 1].average_weight;

            const variation = ((lastWeekWeight - firstWeekWeight) / firstWeekWeight) * 100;
            setVariation(variation);
            console.log(`Variación en el peso: ${variation.toFixed(2)}%`);
            if (variation > 0) {
              setGraphColor('#3ae722');
            }
            else {
              setGraphColor('#f54646');
            }
          }
        } catch (error) {
          console.error('Error en la consulta:', error);
        }
      };

      calculateVolume();
    }
  
  }, [isFocused]);



  return (
    <TouchableOpacity >
        <View className="w-36 h-36 bg-slate-200 rounded-2xl mr-2 items-center overflow-hidden">
              
              <View className="h-full absolute inset-0 overflow-hidden p-0 m-0 -left-3">
              { lineData && lineData.length > 0 &&
                <LineChart
                areaChart
                curved
                data={lineData}
                height={144}
                spacing={lineData.length > 1 ? (220 / lineData.length) : 30}
                initialSpacing={0}
                color1={graphColor}
                hideDataPoints
                startFillColor1={graphColor}
                startOpacity={0.8}
                endOpacity={0}
                hideYAxisText
                hideAxesAndRules
                isAnimated
                />

              }
            </View>
    
            <Text className="absolute bottom-4 font-black text-xl">
                {rutina.name}
            </Text>

            <Text className="absolute top-6 font-black text-2xl shadow-zinc-700 shadow-md">
              {(variation && variation > 0) && "+" }
              {variation ? variation.toFixed(0) : '...'}%
              
            </Text>

        </View>
    </TouchableOpacity>
  )
}

export default ChartStat