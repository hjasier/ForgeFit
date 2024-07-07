import { View, Text , Image , TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation , useIsFocused } from '@react-navigation/native';
import { Icon } from '@rneui/themed'
import { useDatabase } from '../hooks/DatabaseContext';
import { useEffect } from 'react';
import { useState } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';

const ListaEjersConfig = ({rutina}) => {

    const isFocused = useIsFocused();  
    const navigation = useNavigation();
    const db = useDatabase();

    const [exercises, setExercises] = useState([]);
    const [data, setData] = useState(exercises);

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

    const handleUpdateOrder = async (data) => {
        const query = `UPDATE routine_exercises SET exOrder = ? WHERE routine_id = ? AND exercise_id = ?;`;
        data.forEach(async (item, index) => {
          const values = [index, rutina.id, item.id];
          await db.runAsync(query, values);
        });

    }
  

    const renderItem = ({ item, drag, isActive }) => {
      return (
        <View
          key={item.id}
          className={`flex-row justify-between mb-3 bg-[#EAEAEA] h-14 w-full items-center px-4 rounded-lg ${isActive ? 'bg-gray-300' : ''}`}
        >
          <TouchableOpacity onPressIn={drag}>
            <Icon type='font-awesome-5' size={20} name="grip-horizontal" color={"#8A8A8A"} />
          </TouchableOpacity>
  
          <ScrollView horizontal className="">
            <View className="flex-row space-x-3 items-center px-4">
              <Image className="w-8 h-8" source={require('../assets/testEx.png')} />
              <Text className="text-base">{item.name}</Text>
            </View>
          </ScrollView>
  
          <TouchableOpacity>
            <Icon size={20} type="ionicon" name="ellipsis-vertical" />
          </TouchableOpacity>
        </View>
      );
    };
  
    return (

        <View className="w-full pb-24 px-6 space-y-3">


        {exercises.length === 0 && (
          <View className="flex-row justify-center items-center h-14 w-full rounded-lg">
            <Text className="text-base">No hay ejercicios</Text>
          </View>
        )}


        <DraggableFlatList
              contentContainerStyle={{ paddingBottom: 500 }}
              data={exercises}
              onDragEnd={({ data }) => {
                // Actualiza el estado con el nuevo orden
                setData(data);
                setExercises(data);
                console.log(data); // Muestra el nuevo orden en la consola
                handleUpdateOrder(data);
              }}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />


        </View>
  
 
  
  
  
    )
}

export default ListaEjersConfig