import { View, Text , Image , TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useNavigation , useIsFocused } from '@react-navigation/native';
import { Icon } from '@rneui/themed'
import { useDatabase } from '../hooks/DatabaseContext';
import { useEffect } from 'react';
import { useState } from 'react';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { initialData } from '../database/initialData';

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

    const handleUpdateSets = (item,newSets) => {
      if (newSets < 1) {newSets = 1;}
      const query = `UPDATE routine_exercises SET sets = ? WHERE routine_id = ? AND exercise_id = ?;`;
      const values = [newSets, rutina.id, item.id];

      setExercises(prevExercises => 
        prevExercises.map(exercise => 
          exercise.id === item.id ? { ...exercise, sets: newSets } : exercise
        )
      );


      db.runAsync(query, values);

      
    }
  

    const renderItem = ({ item, drag, isActive }) => {
      return (
        <View
          key={item.id}
          className={`flex-row justify-between py-2 mb-3 bg-[#EAEAEA] h-[80] w-full items-center px-4 rounded-lg ${isActive ? 'bg-gray-300' : ''}`}
        >

        <View className="flex-row space-x-2 items-center">
          <TouchableOpacity onPressIn={drag}>
            <Icon type='font-awesome-5' size={20} name="grip-horizontal" color={"#8A8A8A"} />
          </TouchableOpacity>

        </View>

        <View className="w-52">

          <ScrollView horizontal>
            <Text className="text-base">{item.name}</Text>
          </ScrollView>

          <View className="flex-row justify-between px-3">
            
            <Image resizeMode="contain" className="w-8 h-8" source={initialData.images[item.imgSRC].imgSRC} />

            <View className="flex-row items-center space-x-2 justify-center">
              <TouchableOpacity onPress={() => handleUpdateSets(item,item.sets-1)} className="bg-[#171717] p-0.5 rounded-md ">
                <Icon size={18} type="entypo" name="minus" color={"white"}/>
              </TouchableOpacity>
              <TextInput editable={false} focusable={false} value={item.sets.toString()} className="w-10 h-8 text-center bg-[#EAEAEA] rounded-md shadow-md shadow-gray-700" />
              <TouchableOpacity onPress={() => handleUpdateSets(item,item.sets+1)} className="bg-[#171717] p-0.5 rounded-md ">
                <Icon size={18} type="entypo" name="plus" color={"white"}/>
              </TouchableOpacity>
            </View>

          </View>

        </View>
  
  
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
                setData(data);
                setExercises(data);
                handleUpdateOrder(data);
              }}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />


        </View>
  
 
  
  
  
    )
}

export default ListaEjersConfig