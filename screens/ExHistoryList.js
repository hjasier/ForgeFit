import { View, Text , TouchableOpacity , TextInput } from 'react-native'
import React from 'react'
import MenuNavBar from '../components/MenuNavBar'
import { Icon } from '@rneui/themed'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDatabase } from '../hooks/DatabaseContext'

const ExHistoryList = () => {

  const navigation = useNavigation();
  const db = useDatabase();
  const isFocused = useIsFocused();
  
  const [setsByExercise, setSetsByExercise] = useState([]);


  useEffect(() => {
    if (db) {
      const getSets = async () => {
        const query = `
          SELECT *, ex.name as exercise_name
          FROM sets s
          JOIN exercises ex ON s.exercise_id = ex.id 
          WHERE DATE(s.date) = DATE(?);
          ORDER BY s.date;
        `;
        const values = ['2024-07-05'];
        const result = await db.getAllAsync(query, values);
        
        const setsByEx = {};  // Inicializar como un objeto vacío

        result.forEach(set => {
            const exerciseName = set.exercise_name;
        
            // Verificar si el ejercicio ya existe en setsByEx
            if (!setsByEx[exerciseName]) {
                // Si no existe, inicializarlo como un array vacío
                setsByEx[exerciseName] = [];
            }
        
            // Agregar el conjunto al array correspondiente
            setsByEx[exerciseName].push(set);
        });
        console.log(setsByEx);
        setSetsByExercise(setsByEx);
      }
      getSets();
    }
  }, [isFocused]);



  return (
    <View>

        {/* NavBar */}


        <MenuNavBar>
            <View className="justify-between flex-row w-full px-6 items-center">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon size={18} name="arrow-left" type="font-awesome-5" color="white" />
              </TouchableOpacity>
                <TextInput className="bg-[#d9d9d92c] text-center text-white text-base h-12 w-44 rounded-lg" placeholder='Buscar Ejercicio' />
                
                <TouchableOpacity>
                  <Text className="w-15 font-extrabold text-xl text-white">1:33</Text>
                </TouchableOpacity>
            </View>
        </MenuNavBar> 



        {/* Lista de ejercicios hechos */}
        

        <View className="flex-row justify-center py-5 items-center space-x-3">
            <TouchableOpacity>
                <Icon size={18} name="arrow-left" type="font-awesome-5" color="black" />
            </TouchableOpacity>

            <Text>Hoy</Text>

            <TouchableOpacity>
                <Icon size={18} name="arrow-right" type="font-awesome-5" color="black" />
            </TouchableOpacity>
        </View>
        
        <View className="px-8">

        <ScrollView className="space-y-4 h-[500]">
        
        {Object.keys(setsByExercise).map(exercise => (
            
        <View key={exercise}>

        <Text className="bg-[#EAEAEA] self-start p-2 rounded-t-lg">{exercise}</Text>
        
        <View className="w-full rounded-lg bg-[#EAEAEA] rounded-tl-none ">
            

            {setsByExercise[exercise].map((set, index) => (
                
            <View key={index} className="flex-row justify-between py-2 px-3">
                <Text className="w-20 font-semibold text-blue-500">{new Date(new Date(set.date).getTime() + 2 * 60 * 60 * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' })}</Text>
                <Text className="w-20 font-bold">{set.weight} kg</Text>
                <Text className="w-20 text-gray-700">{set.reps} reps</Text>
                
                {index === 0 ? (
                <Text className="w-20 text-slate-400">{setsByExercise[exercise].length} sets</Text>
                ):(
                <Text className="w-20 text-slate-400"></Text>
                )}     
                
            </View>
            ))}



        </View>

        </View>
        ))}
        
        </ScrollView>


        </View>




    </View>
    
  )
}

export default ExHistoryList