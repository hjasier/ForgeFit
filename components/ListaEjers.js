import { View, Text , Image , TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation , useIsFocused } from '@react-navigation/native';
import { Icon } from '@rneui/themed'
import { useDatabase } from '../hooks/DatabaseContext';
import { useEffect , useState } from 'react';
import { initialData } from '../database/initialData';
import moment from 'moment';

const ListaEjers = ({search,rutina}) => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const db = useDatabase();

  const [exercises, setExercises] = useState([]);
  const [exercisesByIDs, setExercisesByIDs] = useState({});
  const [completedExercises, setCompletedExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [connectedExercises, setConnectedExercises] = useState({});
  const [completedGroups, setCompletedGroups] = useState([]);


  const groupExercisesByIDs = (exercises) => {
    const exercisesByIDs = {};
    exercises.forEach(exercise => {
      exercisesByIDs[exercise.id] = exercise;
    });
    setExercisesByIDs(exercisesByIDs);
  }


  useEffect(() => {
    if (db && rutina) {
        const getExercises = async () => {
        const query = `
            SELECT * 
            FROM routine_exercises
            JOIN exercises ON routine_exercises.exercise_id = exercises.id
            WHERE routine_exercises.routine_id = ? ${search ? `AND exercises.name LIKE '%${search}%'` : ''}
            ORDER BY routine_exercises.exOrder;
        `;
        const values = [rutina.id];
        const result = await db.getAllAsync(query, values);
        setExercises(result);
        groupExercisesByIDs(result);
        }
        getExercises();
    }
    }, [rutina,isFocused,search]);


  useEffect(() => {
    if (db) {
      const getCompletedExercises = async () => {
        const query = `
          SELECT * 
          FROM sets
          WHERE DATE(date) = DATE(?) 
          AND isMainSet = 1
          ORDER BY date DESC;
        `;
        const result = await db.getAllAsync(query, [moment().format('YYYY-MM-DD')]);
        setCurrentExercise(result[0]);
        groupByExerciseID(result);
      }
      getCompletedExercises();
    }
  } , [isFocused]);

  useEffect(() => {
    if (db) {
      const getConnectedExercises = async () => {
        const query = `
          SELECT * FROM group_exercise;
        `;
        const result = await db.getAllAsync(query);
        const connectedExercises = {};
        result.forEach((item) => {
          if (!connectedExercises[item.exercise_id]) {
            connectedExercises[item.exercise_id] = [];
          }
          connectedExercises[item.exercise_id].push(item.group_id);
        });
        setConnectedExercises(connectedExercises);
      }
      getConnectedExercises();
    }
  }, [isFocused]);




  const groupByExerciseID = (sets) => {
    const setsByEx = {};  // Inicializar como un objeto vacío
    sets.forEach(set => {
        const exerciseID = set.exercise_id;
        if (!setsByEx[exerciseID]) {
            setsByEx[exerciseID] = [];
        }
        setsByEx[exerciseID].push(set);
    });
    setCompletedExercises(setsByEx);
    updateCompletedGroups(setsByEx);
  }

  const updateCompletedGroups = (completedExercises) => {
    const completedGroups = [];
    Object.keys(completedExercises).forEach(set => {
      if ((exercisesByIDs[set] && connectedExercises[set]) && (completedExercises[set].length >= exercisesByIDs[set].sets)) {
        completedGroups.push(...connectedExercises[set]);
      }
    });
    setCompletedGroups(completedGroups);
  }

  const sortedExercises = exercises.sort((a, b) => {
    const aCompleted = completedExercises[a.id] && completedExercises[a.id].length >= a.sets;
    const bCompleted = completedExercises[b.id] && completedExercises[b.id].length >= b.sets;

    const aCurrent = currentExercise && currentExercise.exercise_id === a.id;
    const bCurrent = currentExercise && currentExercise.exercise_id === b.id;

    const aConnected = connectedExercises[a.id] && completedGroups.some(grup => connectedExercises[a.id].includes(grup));
    const bConnected = connectedExercises[b.id] && completedGroups.some(grup => connectedExercises[b.id].includes(grup));



    if (aCurrent && !bCurrent) return -1;
    if (!aCurrent && bCurrent) return 1;
    
    if (aCompleted && !bCompleted) return 1;
    if (!aCompleted && bCompleted) return -1;

    if (aConnected && !bConnected) return 1;
    if (!aConnected && bConnected) return -1;


    return 0;
  });


  return (
    <ScrollView className="w-full h-[505]">
      <View className="w-full pb-24 px-6 space-y-3">
      {sortedExercises.map((exercise) => (
        <TouchableOpacity onPress={() => navigation.navigate("SaveEjDone",{exercise:exercise})} key={exercise.id} 

        style={{
          backgroundColor: (completedExercises[exercise.id] && completedExercises[exercise.id].length >= exercise.sets)
            ? 'rgba(0, 255, 87, 0.21)' //Completado
            : (completedExercises[exercise.id] && completedExercises[exercise.id]) 
              ? (exercise.id == currentExercise.exercise_id) 
                ? 'rgba(255, 230, 0, 0.31)' // En curso
                : '#D9D9D9' // Olvidado
              : (connectedExercises[exercise.id] && completedGroups.some(grup => connectedExercises[exercise.id].includes(grup)))
                ? '#00a2ff17' // Completado
                : '#EAEAEA' // No iniciado
              
              
              


              
        }}

        className="flex-row justify-between h-14 w-full items-center px-4 rounded-lg">
          <View className="flex-row items-center">
            <Image resizeMode="contain" className="w-8 h-8" source={initialData.images[exercise.imgSRC].imgSRC} />

            <View className="pl-3 w-56">
                <Text className="text-base">{exercise.name}</Text>
            </View>
            
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ExHistory",{exercise:exercise})}>
            <Icon size={20} name="history" type="font-awesome-5"/>
          </TouchableOpacity>

        </TouchableOpacity>
      ))}
      </View>


    </ScrollView>



  )
}

export default ListaEjers