import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Image , TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDatabase } from '../hooks/DatabaseContext'
import { useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { initialData } from '../database/initialData'


const SelectorRutina = ({unselect, set ,rutina , setRutina}) => {

  const db = useDatabase();
  const isFocused = useIsFocused();

  const [rutinas, setRutinas] = useState([]);

  useEffect(() => {
    if (db) {
      const getRutinas = async () => {
        const query = `SELECT * FROM routines;`;
        const result = await db.getAllAsync(query);
        setRutinas(result);
        if (set!=null && result.length>0){
          setRutina(result[set]);
        }
      }
      getRutinas();

    }
  }, [isFocused]);

  const handleSelectRutina = (rut) => {
    if (unselect && rutina && rutina.id === rut.id){
      setRutina(null);
      return;
    }
    setRutina(rut)
  }
  

  


  return (

    <ScrollView horizontal className="flex-row space-x-3">
      
      {rutinas.length === 0 ? (
        <View className="flex-row justify-center items-center h-14 w-full rounded-lg">
          <Text className="text-base">No hay rutinas guardadas</Text>
        </View>
      ) : (
      rutinas.map((rut) => (
        <TouchableOpacity
          onPress={() => handleSelectRutina(rut)}
          key={rut.id}
          style={
            rutina && (rut.id === rutina.id) ? { backgroundColor: "#FFD700" } : { backgroundColor: "#d9d9d93e" }
          }
          className="w-16 h-20 rounded-xl items-center justify-center drop-shadow-md shadow-gray-700"
        >
          <Image resizeMode="contain" className="w-10 h-10" source={initialData.muscleGroups[rut.imgSRC].imgSRC} />
          <Text>{rut.name}</Text>
        </TouchableOpacity>
      ))
    )}


    </ScrollView>
  )
}

export default SelectorRutina