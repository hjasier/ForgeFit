import { View, Text , TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useEffect , useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SelectorGrupo from '../components/SelectorGrupo'
import { useDatabase } from '../hooks/DatabaseContext'
import { ScrollView } from 'react-native-gesture-handler'
import { initialData } from '../database/initialData'


const SelectRoutineEjs = ({route}) => {
    const routine = route.params.routine; //para saber cuales ya estan en la rutina
    const db = useDatabase();
    const navigation = useNavigation();
    const [group, setGroup] = useState(0);

    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);

    // Get exercises according to muscle group
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
    }, [group]);

    // Get selected exercises for the routine
    useEffect(() => {
      if (db) {
        const getSelectedExercises = async () => {
          const query = `SELECT * FROM routine_exercises WHERE routine_id = ?;`;
          const values = [routine.id];
          const result = await db.getAllAsync(query, values);
          setSelectedExercises(result);
        }
        getSelectedExercises();
      }
    }
    , [routine]);

    const handleSelectExercise = async (exercise) => {
      if (selectedExercises.find((e) => e.exercise_id === exercise.id)) {
        if (exercise.exOrder < selectedExercises.length) {
          //Update following exercises exOrder
          const query = `UPDATE routine_exercises SET exOrder = exOrder - 1 WHERE routine_id = ? AND exOrder >= ?;`;
          const values = [routine.id, exercise.exOrder];
          await db.runAsync(query, values);
        }
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
      </View>

      <View className="items-center mt-5 w-full px-8">
          <SelectorGrupo group={group} setGroup={setGroup} />
      </View>

      <ScrollView className="h-[550] mt-5" >
      <View className="items-center pb-24 px-5 space-y-3">

      {exercises.map((exercise) => {
        // Encontrar el ejercicio seleccionado en la lista de selectedExercises
        const selectedExercise = selectedExercises.find((e) => e.exercise_id === exercise.id);
        
        return (
          <TouchableOpacity
            onPress={() => handleSelectExercise(exercise)}
            style={{
              backgroundColor: selectedExercise ? "#FFD700" : "#EAEAEA"
            }}
            key={exercise.id}
            className="flex-row justify-between bg-[#EAEAEA] h-14 w-full items-center px-4 rounded-lg"
          >
            <View>
              <Image resizeMode='contain' className="w-8 h-8" source={initialData.images[exercise.imgSRC].imgSRC} />
            </View>

            <Text>{exercise.name}</Text>

            {/* Mostrar exOrder si el ejercicio está seleccionado */}
            {selectedExercise && (
              <View>
                <Text className="px-3 py-2 bg-[#EAEAEA] rounded-md font-bold shadow-md shadow-gray-700">
                  {selectedExercise.exOrder} {/* Aquí se muestra exOrder */}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      </View>
      </ScrollView>
      
        
    </SafeAreaView>
  )
}

export default SelectRoutineEjs;