import { View, Text , TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useEffect , useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SelectorGrupo from '../components/SelectorGrupo'
import { useDatabase } from '../hooks/DatabaseContext'
import { ScrollView } from 'react-native-gesture-handler'
import { initialData } from '../database/initialData'


const SelectGroupEjs = ({route}) => {
    const editingGroup = route.params.group; //para saber cuales ya estan en el grupo
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

    // Get selected exercises for the editingGroup
    useEffect(() => {
      if (db) {
        const getSelectedExercises = async () => {
          const query = `SELECT * FROM group_exercise WHERE group_id = ?;`;
          const values = [editingGroup.id];
          const result = await db.getAllAsync(query, values);
          setSelectedExercises(result);
        }
        getSelectedExercises();
      }
    }
    , [editingGroup]);

    const handleSelectExercise = async (exercise) => {
      if (selectedExercises.find((e) => e.exercise_id === exercise.id)) {
        const query = `DELETE FROM group_exercise WHERE group_id = ? AND exercise_id = ?;`;
        const values = [editingGroup.id, exercise.id];
        await db.runAsync(query, values);
      } 
      else {
        const query = `INSERT INTO group_exercise (group_id, exercise_id) VALUES (?, ?);`;
        const values = [editingGroup.id, exercise.id];
        await db.runAsync(query, values);
      }
      const query = `SELECT * FROM group_exercise WHERE group_id = ?;`;
      const values = [editingGroup.id];
      const result = await db.getAllAsync(query, values);
      setSelectedExercises(result);
    }
    

  return (
    <SafeAreaView>

      <View className="items-center space-y-3 pt-5">
        <Text className="font-bold">Seleccionando ejercicios para {editingGroup.name}</Text>
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

            
          </TouchableOpacity>
        );
      })}

      </View>
      </ScrollView>
      
        
    </SafeAreaView>
  )
}

export default SelectGroupEjs;