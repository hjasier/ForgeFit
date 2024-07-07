import { View, Text , Image , TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation , useIsFocused } from '@react-navigation/native';
import { Icon } from '@rneui/themed'
import { useDatabase } from '../hooks/DatabaseContext';
import { useEffect , useState } from 'react';
import { initialData } from '../database/initialData';

const ListaEjers = ({rutina}) => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const db = useDatabase();

  const [exercises, setExercises] = useState([]);


  useEffect(() => {
    if (db) {
        const getExercises = async () => {
        const query = `
            SELECT * 
            FROM routine_exercises
            JOIN exercises ON routine_exercises.exercise_id = exercises.id
            WHERE routine_exercises.routine_id = ?
            ORDER BY routine_exercises.exOrder;
        `;
        const values = [rutina.id];
        const result = await db.getAllAsync(query, values);
        setExercises(result);
        }
        getExercises();
    }
    }, [rutina,isFocused]);


  return (
    <ScrollView className="w-full h-[505]">
      <View className="w-full pb-24 px-6 space-y-3">
      {exercises.map((exercise) => (
        <TouchableOpacity onPress={() => navigation.navigate("SaveEjDone",{exercise:exercise})} key={exercise.id} 
        className="flex-row justify-between bg-[#EAEAEA] h-14 w-full items-center px-4 rounded-lg">
          <View className="flex-row items-center">
            <Image resizeMode="contain" className="w-8 h-8" source={initialData.images[exercise.imgSRC].imgSRC} />

            <View className="pl-3 w-56">
                <Text className="text-base">{exercise.name}</Text>
            </View>
            
          </View>
          <TouchableOpacity>
            <Icon size={20} name="history" type="font-awesome-5"/>
          </TouchableOpacity>

        </TouchableOpacity>
      ))}
      </View>


    </ScrollView>



  )
}

export default ListaEjers