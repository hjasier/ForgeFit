import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import ChartStat from './ChartStat'
import { ScrollView } from 'react-native-gesture-handler'
import { useDatabase } from '../hooks/DatabaseContext'
import { useIsFocused } from '@react-navigation/native'

const ChartStats = () => {

    const [rutinas, setRutinas] = useState([]);
    const db = useDatabase();
    const isFocused = useIsFocused();
  
    useEffect(() => {
        if (db) {
          const getRutinas = async () => {
            const query = `SELECT * FROM routines;`;
            const result = await db.getAllAsync(query);
            setRutinas(result);
          }
          getRutinas();
        }
      }, [isFocused]);


  return (
    <View classname="">
        <ScrollView horizontal className="">

            { rutinas.length === 0 ? (
                <View className="">
                    <Text className="">No hay rutinas guardadas</Text>
                </View>
            ) : (
                rutinas.map((rut) => (
                    <ChartStat rutina={rut} key={rut.id} />
                ))
            )}
        

            
            


        </ScrollView>
    </View>
  )
}

export default ChartStats