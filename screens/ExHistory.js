import { View, Text , TouchableOpacity , TextInput, Image } from 'react-native'
import React from 'react'
import MenuNavBar from '../components/MenuNavBar'
import { Icon } from '@rneui/themed'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDatabase } from '../hooks/DatabaseContext'
import { initialData } from '../database/initialData'
import { SafeAreaView } from 'react-native-safe-area-context'
import Timer from '../components/Timer'
import { Swipeable } from 'react-native-gesture-handler';


const ExHistory = ({route}) => {
  
  const exercise = route.params.exercise;
  const navigation = useNavigation();
  const db = useDatabase();
  const isFocused = useIsFocused();

    
  const [exercises, setExercises] = useState([]);


  useEffect(() => {
    if (db) {
      const getExercises = async () => {
        const setsQuery = `
            SELECT sets.*, COALESCE(d.num_dropsets, 0) AS num_dropsets
            FROM sets
            LEFT JOIN (
                SELECT main_set_id, COUNT(id) AS num_dropsets
                FROM dropsets
                GROUP BY main_set_id
            ) d ON sets.id = d.main_set_id
            WHERE exercise_id = ? 
                AND isMainSet = 1 
            ORDER BY sets.date DESC;
        `;

        const values = [exercise.id];
        const sets = await db.getAllAsync(setsQuery, values);

        if (sets.length === 0) {
          return;
        }
        setExercises(groupByDate(sets));

      }

      getExercises();
    }
  }
    , [exercise,isFocused]);



    const groupByDate = (data) => {
        if (!data[0].date) {
            return {};
        }
        const groupedData = {};
        data.forEach((item) => {
            const dateKey = item.date.split(' ')[0];
            if (!groupedData[dateKey]) {
                groupedData[dateKey] = [];
            }
            groupedData[dateKey].push(item);
        });
        return groupedData;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const monthNames = [
          "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
          "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        const day = date.getDate();
        const monthName = monthNames[date.getMonth()];
        const formattedDate = `${day} de ${monthName}`;
        return formattedDate;
      };

    const handleEditSet = (set,type) => (text) => {
        const newValue = parseFloat(text);
        if (isNaN(newValue)) {
            return;
        }
        const query = `UPDATE sets SET ${type} = ?  WHERE id = ?;`;
        const values = [newValue, set.id];
        db.runAsync(query, values);
    }

    const handleDeleteSet = async (set) => {
      try {
        if (db) {
          const queryDropsets = `SELECT * FROM dropsets WHERE main_set_id = ?;`;
          const dropsets = await db.getAllAsync(queryDropsets, [set.id]);
    
          await Promise.all(dropsets.map(drop => {
            const q2 = `DELETE FROM dropsets WHERE id = ?;`;
            return db.runAsync(q2, [drop.id]);
          }));
    
          const query = `DELETE FROM sets WHERE id = ?;`;
          await db.runAsync(query, [set.id]);
    
          setExercises(prevExercises => {
            const updatedExercises = { ...prevExercises };
            const dateKey = set.date.split(' ')[0];
            
            if (updatedExercises[dateKey]) {
              updatedExercises[dateKey] = updatedExercises[dateKey].filter(s => s.id !== set.id);
              if (updatedExercises[dateKey].length === 0) {
                delete updatedExercises[dateKey]; // Eliminar la fecha si no hay sets
              }
            }
            return updatedExercises;
          });
        }
      } catch (error) {
        console.error("Error al borrar el set", error);
      }
    };


    const renderSet = ({ item: set }) => {
      // Comprobar si es el día de hoy
      const isToday = new Date(set.date).toISOString().split('T')[0] === new Date().toISOString().split('T')[0];
    
      const content = (
        <View key={set.id} className="flex-row justify-between py-1 px-3">
          <Text className="w-20 font-semibold text-blue-500">
            {new Date(new Date(set.date).getTime() + 2 * 60 * 60 * 1000).toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/Madrid'
            })}
          </Text>
          <View className="w-20 flex-row items-center">
            <TextInput className="font-bold text-right" onChangeText={handleEditSet(set, 'weight')}>
              {set.weight}
            </TextInput>
            <Text className="font-bold"> kg</Text>
          </View>
          <View className="w-20 flex-row items-center">
            <TextInput onChangeText={handleEditSet(set, 'reps')} className="text-gray-700 text-right">
              {set.reps}
            </TextInput>
            <Text className="text-gray-700"> reps</Text>
          </View>
          {0 === 0 ? (
            <Text className="w-20 text-slate-400">{1 + set.num_dropsets} sets</Text>
          ) : (
            <Text className="w-20 text-slate-400"></Text>
          )}
        </View>
      );
    
      return isToday ? (
        <Swipeable renderRightActions={() => rightSwipe(set)}>
          {content}
        </Swipeable>
      ) : (
        content
      );
    };

    const rightSwipe = (set) => (
      <View className="items-center justify-center">
          <TouchableOpacity onPress={() => handleDeleteSet(set)} className="w-[50] h-full bg-red-600 justify-center items-center rounded-l-lg">
              <Icon type='font-awesome-5' name="trash" size={15} color="white" />
          </TouchableOpacity>
      </View>
    );
    
  
    const renderItem = ({ item: section }) => (
      <View key={section.date} className="mb-5">
        <View className="flex-row justify-between">
          <Text className="bg-[#EAEAEA] self-start p-2 rounded-t-lg">{formatDate(section.date)}</Text>
          <Text className="bg-[#EAEAEA] self-start p-2 rounded-t-lg">
            {section.sets.length + section.sets.reduce((total, exercise) => total + exercise.num_dropsets, 0)} sets
          </Text>
        </View>
        <View className="w-full rounded-lg bg-[#EAEAEA] rounded-t-none">
          <FlatList
            data={section.sets}
            renderItem={renderSet}
            keyExtractor={set => set.id.toString()}
          />
        </View>
      </View>
    );

  const sections = Object.keys(exercises).map(date => ({
    date,
    sets: exercises[date]
  }));
  

  return (
    <SafeAreaView>

        {/* NavBar */}
        <MenuNavBar>
            <View className="justify-between flex-row w-full px-6 items-center">

              <TouchableOpacity className="py-4" onPress={() => navigation.navigate("SaveEjDone",{exercise:exercise})}>
                <Icon size={20} name="plus-square" type="font-awesome" color="white" />
              </TouchableOpacity>
            
              <View className="flex-row text-center items-center justify-center space-x-2 max-w-xs">
                <Image resizeMode="contain" className="w-8 h-8" source={initialData.images[exercise.imgSRC].imgSRC} />
                <Text style={{maxWidth:192}} className="text-center text-white font-bold text-base">{exercise.name}</Text>
              </View>

              {/* CountDown Timer */}
              <Timer/> 
            </View>
        </MenuNavBar> 



        {/* Historial de un ejercicio concreto cada dia*/}
        
        
        
        <View className="px-8">

        <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={section => section.date}
        contentContainerStyle={{ paddingBottom: 280 , paddingTop:50 }}
        />


        </View>




    </SafeAreaView>
    
  )
}

export default ExHistory