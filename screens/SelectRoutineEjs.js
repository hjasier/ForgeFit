import { View, Text , TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useEffect , useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SelectorGrupo from '../components/SelectorGrupo'
import { useDatabase } from '../hooks/DatabaseContext'
import { ScrollView } from 'react-native-gesture-handler'


const SelectRoutineEjs = ({route}) => {
    const routine = route.params.routine; //para saber cuales ya estan en la rutina
    const db = useDatabase();
    const navigation = useNavigation();
    const [group, setGroup] = useState(0);

    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);

    useEffect(() => {
      if (db) {
        const getExercises = async () => {
          const query = `SELECT * FROM exercises WHERE muscleGroup = ? ORDER BY name;`;
          const values = [group];
          const result = await db.getAllAsync(query, values);
          setExercises(result);
        }
        getExercises();
      }
    }, [db, group]);

    useEffect(() => {
      if (db) {
        const getSelectedExercises = async () => {
          const query = `SELECT * FROM routine_exercises WHERE routine_id = ?;`;
          const values = [routine.id];
          const result = await db.getAllAsync(query, values);
          console.log(result);
          setSelectedExercises(result);
        }
        getSelectedExercises();
      }
    }
    , [db, routine]);

    const handleSelectExercise = async (exercise) => {
      if (selectedExercises.find((e) => e.exercise_id === exercise.id)) {
        const query = `DELETE FROM routine_exercises WHERE routine_id = ? AND exercise_id = ?;`;
        const values = [routine.id, exercise.id];
        await db.runAsync(query, values);
      } 
      else {
        const query = `INSERT INTO routine_exercises (routine_id, exercise_id,exOrder) VALUES (?, ?, ?);`;
        const values = [routine.id, exercise.id,selectedExercises.length+1];
        await db.runAsync(query, values);
      }
      const query = `SELECT * FROM routine_exercises WHERE routine_id = ?;`;
      const values = [routine.id];
      const result = await db.getAllAsync(query, values);
      setSelectedExercises(result);
    }
    

  return (
    <SafeAreaView>

      <View className="items-center space-y-3 pt-5">
        <Text className="font-bold">Seleccionando ejercicios para {routine.name}</Text>
        <Text>Mis Rutinas</Text>
      </View>

      <View className="items-center mt-5 w-full px-8">
          <SelectorGrupo group={group} setGroup={setGroup} />
      </View>

      <ScrollView className="h-[550] mt-5" >
      <View className="items-center pb-24 px-5 space-y-3">

        {exercises.map((exercise) => (
            <TouchableOpacity
                onPress={() => handleSelectExercise(exercise)}
                style={{backgroundColor: selectedExercises.find((e) => e.exercise_id === exercise.id) ? "#171717" : "#EAEAEA"}}
                key={exercise.id} className="flex-row justify-between bg-[#EAEAEA] h-14 w-full items-center px-4 rounded-lg">
                <View>
                <Image className="w-8 h-8" source={require('../assets/testEx.png')}/>
                </View>

                <Text>{exercise.name}</Text>

                {selectedExercises.find((e) => e.exercise_id === exercise.id) && (
                <View className="">
                  <Text className="px-3 py-2 bg-[#EAEAEA] rounded-md font-bold shadow-md shadow-gray-700">0</Text>
                </View>
                )}
                

            </TouchableOpacity>
        ))}
      </View>
      </ScrollView>
      
        
    </SafeAreaView>
  )
}

export default SelectRoutineEjs;