import { View, Text , TouchableOpacity , TextInput } from 'react-native'
import React from 'react'
import MenuNavBar from '../components/MenuNavBar'
import { Icon } from '@rneui/themed'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDatabase } from '../hooks/DatabaseContext'
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Swipeable } from 'react-native-gesture-handler';
import Timer from '../components/Timer'

const ExHistoryList = ({route}) => {
  
  const date = route.params.date;
  const navigation = useNavigation();
  const db = useDatabase();
  const isFocused = useIsFocused();
  const [setsByExercise, setSetsByExercise] = useState([]);
  const [histDate, setHistDate] = useState(date);
  const [search, setSearch] = useState('');


  useEffect(() => {
    if (db) {
      const getSets = async () => {
        const query = `
          SELECT *, s.id as id, ex.name as exercise_name
          FROM sets s
          JOIN exercises ex ON s.exercise_id = ex.id 
          WHERE DATE(s.date) = DATE(?)
          ${search ? `AND ex.name LIKE '%${search}%'` : ''}
          AND s.isMainSet = 1
          ORDER BY s.date DESC;
        `;
        const result = await db.getAllAsync(query, [histDate]);
        const setsByEx = {};  // Inicializar como un objeto vacío

        result.forEach(set => {
            const exerciseName = set.exercise_name;
            if (!setsByEx[exerciseName]) {
                setsByEx[exerciseName] = [];
            }
            setsByEx[exerciseName].push(set);
        });
        setSetsByExercise(setsByEx);
      }
      getSets();
    }
  }, [histDate,isFocused,search]);



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
    console.log(set);
    const newValue = parseFloat(text);
    if (isNaN(newValue)) {
        return;
    }
    const query = `UPDATE sets SET ${type} = ?  WHERE id = ?;`;
    const values = [newValue, set.id];
    db.runAsync(query, values);
  }

  const sections = Object.keys(setsByExercise).map(exercise => ({
    exercise,
    sets: setsByExercise[exercise]
  }));

  const renderSet = ({ item: set, index, section }) => (
    <Swipeable renderRightActions={() => rightSwipe(set)}>
    
    <View key={index} className="flex-row justify-between py-0.5 px-3 items-center">
      <Text className="w-20 font-semibold text-blue-500">
        {new Date(new Date(set.date).getTime() + 2 * 60 * 60 * 1000).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/Madrid'
        })}
      </Text>
      <View className="w-20 flex-row items-center">
        <TextInput className="font-bold p-0 text-right" onChangeText={handleEditSet(set, 'weight')}>
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
      {index === 0 ? (
        <Text className="w-20 text-slate-400">{section.sets.length} sets</Text>
      ) : (
        <Text className="w-20 text-slate-400"></Text>
      )}
    </View>
    </Swipeable>
  );

  const renderItem = ({ item: section }) => (
    <View key={section.exercise} className="mb-5">
      <View className="flex-row justify-between">
        <Text className="bg-[#EAEAEA] self-start p-2 rounded-t-lg font-semibold">{section.exercise}</Text>
      </View>
      <View className="w-full rounded-lg bg-[#EAEAEA] rounded-tl-none">
        <FlatList
          data={section.sets}
          renderItem={(props) => renderSet({ ...props, section })}
          keyExtractor={(set, index) => index.toString()}
        />
      </View>
    </View>
  );

  const handleDeleteSet = async (set) => {
    console.log(set);
    try {
      if (db) {
        //Get set dropsets
        const queryDropsets = `SELECT * FROM dropsets WHERE main_set_id = ?;`;
        const dropsets = await db.getAllAsync(queryDropsets, [set.id]);

        console.log(dropsets);
        
        //Delete dropsets
        for (let i = 0; i < dropsets.length; i++) {
          const q1 = `DELETE FROM sets WHERE id = ?;`;
          const q2 = `DELETE FROM dropsets WHERE id = ?;`;
          
          await db.runAsync(q1, [dropsets[i].drop_set_id]);
          await db.runAsync(q2, [dropsets[i].id]);
        }

        const query = `DELETE FROM sets WHERE id = ?;`;
        await db.runAsync(query, [set.id]);

        const updatedSets = setsByExercise[set.name].filter(s => s.id !== set.id);
        setSetsByExercise(prevState => ({
          ...prevState,
          [set.name]: updatedSets,
        }));
        
      }
    } catch (error) {
      console.error("Error al borrar el set", error);
    }
  }

  const rightSwipe = (set) => (
    <View className="items-center justify-center">
        <TouchableOpacity onPress={() => handleDeleteSet(set)} className="w-[50] h-full bg-red-600 justify-center items-center rounded-l-lg">
            <Icon type='font-awesome-5' name="trash" size={15} color="white" />
        </TouchableOpacity>
    </View>
);

  return (
    <SafeAreaView>

        {/* NavBar */}


        <MenuNavBar>
            <View className="justify-between flex-row w-full px-6 items-center">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon size={18} name="arrow-left" type="font-awesome-5" color="white" />
              </TouchableOpacity>
                <TextInput onChangeText={setSearch} className="bg-[#d9d9d92c] text-center text-white text-base h-12 w-44 rounded-lg" placeholder='Buscar Ejercicio' />
                
                {/* CountDown Timer */}
                <Timer/> 
            </View>
        </MenuNavBar> 



        {/* Lista de ejercicios hechos */}
        

        <View className="flex-row justify-center py-5 items-center space-x-3">
            <TouchableOpacity onPress={() => setHistDate(moment(histDate).subtract(1, 'days').format('YYYY-MM-DD'))}>
                <Icon size={18} name="arrow-left" type="font-awesome-5" color="black" />
            </TouchableOpacity>

            { histDate == moment().format('YYYY-MM-DD') ?  (
              <Text>Hoy</Text> 
            ) : (
              <Text>{formatDate(histDate)}</Text>
            )}

            <TouchableOpacity onPress={() => setHistDate(moment(histDate).add(1, 'days').format('YYYY-MM-DD'))}>
                <Icon size={18} name="arrow-right" type="font-awesome-5" color="black" />
            </TouchableOpacity>
        </View>
        
        <View className="px-8">

        <FlatList
          data={sections}
          renderItem={renderItem}
          keyExtractor={(section) => section.exercise}
          contentContainerStyle={{ paddingBottom: 280 }}
        />


        </View>




    </SafeAreaView>
    
  )
}

export default ExHistoryList