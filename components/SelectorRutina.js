import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Image , TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDatabase } from '../hooks/DatabaseContext'
import { useState } from 'react'
import { useIsFocused } from '@react-navigation/native'


const SelectorRutina = ({rutina , setRutina}) => {

  const db = useDatabase();
  const isFocused = useIsFocused();

  const [rutinas, setRutinas] = useState([]);

  useEffect(() => {
    if (db) {
      const getRutinas = async () => {
        const query = `SELECT * FROM routines ORDER BY name;`;
        const result = await db.getAllAsync(query);
        setRutinas(result);
        setRutina(result[0]);
      }
      getRutinas();

    }
  }, [isFocused]);
  

  


  return (

    <ScrollView horizontal className="flex-row space-x-3">
      
      {rutinas.length === 0 ? (
        <View className="flex-row justify-center items-center h-14 w-full rounded-lg">
          <Text className="text-base">No hay rutinas</Text>
        </View>
      ) : (
      rutinas.map((rut) => (
        <TouchableOpacity
          onPress={() => setRutina(rut)}
          key={rut.id}
          style={
            rutina && (rut.id === rutina.id) ? { backgroundColor: "#FFD700" } : { backgroundColor: "#d9d9d93e" }
          }
          className="w-16 h-20 rounded-xl items-center justify-center drop-shadow-md shadow-gray-700"
        >
          <Image className="w-10 h-10" source={require('../assets/testEx.png')} />
          <Text>{rut.name}</Text>
        </TouchableOpacity>
      ))
    )}


    </ScrollView>
  )
}

export default SelectorRutina