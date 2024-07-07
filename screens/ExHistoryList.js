import { View, Text , TouchableOpacity , TextInput } from 'react-native'
import React from 'react'
import MenuNavBar from '../components/MenuNavBar'
import { Icon } from '@rneui/themed'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDatabase } from '../hooks/DatabaseContext'
import moment from 'moment';

const ExHistoryList = ({route}) => {
  
  const date = route.params.date;
  const navigation = useNavigation();
  const db = useDatabase();
  const isFocused = useIsFocused();
  
  const [setsByExercise, setSetsByExercise] = useState([]);
  const [histDate, setHistDate] = useState(date);


  useEffect(() => {
    if (db) {
      const getSets = async () => {
        const query = `
          SELECT *, ex.name as exercise_name
          FROM sets s
          JOIN exercises ex ON s.exercise_id = ex.id 
          WHERE DATE(s.date) = DATE(?)
          ORDER BY s.date DESC;
        `;
        const result = await db.getAllAsync(query, [histDate]);

        console.log(result);
        
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
  }, [histDate,isFocused]);



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

        <ScrollView className="space-y-4 ">
        
        <View className="space-y-3">
        {Object.keys(setsByExercise).map(exercise => (
            
        <View key={exercise}>

        <View className="flex-row justify-between">
            <Text className="bg-[#EAEAEA] self-start p-2 rounded-t-lg">{exercise}</Text>
            <Text className="bg-[#EAEAEA] self-start p-2 rounded-t-lg">0 sets</Text>
        </View>

        <View className="w-full rounded-lg bg-[#EAEAEA] rounded-tl-none">
            

            {setsByExercise[exercise].map((set, index) => (
                
            <View key={index} className="flex-row justify-between py-0.5 px-3 items-center">
                <Text className="w-20 font-semibold text-blue-500">{new Date(new Date(set.date).getTime() + 2 * 60 * 60 * 1000).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' })}</Text>
                
                <View className="w-20 flex-row items-center" >
                  <TextInput className="font-bold p-0 text-right" onChangeText={handleEditSet(set,"weight")}>{set.weight}</TextInput>
                  <Text className="font-bold"> kg</Text>
                </View>

                <View className="w-20 flex-row items-center" >
                  <TextInput onChangeText={handleEditSet(set,"reps")} className="text-gray-700 text-right">{set.reps}</TextInput>
                  <Text className="text-gray-700 "> reps</Text>
                </View>
                
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
        </View>
        
        </ScrollView>


        </View>




    </View>
    
  )
}

export default ExHistoryList