import { View, Text ,Image , TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SelectorGrupo from '../components/SelectorGrupo'
import { useState } from 'react'
import { useDatabase } from '../hooks/DatabaseContext'
import { ScrollView } from 'react-native-gesture-handler'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

const ExList = () => {

  const db = useDatabase();
  const navigation = useNavigation();

  const [group, setGroup] = useState(0);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (db) {
      const getExercises = async () => {
        const query = `
          SELECT * FROM exercises
          WHERE muscleGroup = ?
          ORDER BY name;
        `;
        const values = [group];
        const result = await db.getAllAsync(query, values);
        setExercises(result);
      }
      getExercises();
    }
  }, [group]);

  

  return (
    <SafeAreaView className="py-10">
      
    <View className="items-center">
        <Text >Selecciona un grupo muscular</Text>
    </View>

    <View className="px-8 py-5 items-center">
        <SelectorGrupo group={group} setGroup={setGroup} />
    </View>

    <View className="w-full px-7 h-48 items-center space-y-3">

        {exercises.map((exercise) => (

            <TouchableOpacity onPress={() => navigation.navigate("EditEx",{exercise:exercise})} key={exercise.id} className="flex-row justify-between bg-[#EAEAEA] h-14 w-full items-center px-4 rounded-lg">
                <Image className="w-8 h-8" source={require('../assets/testEx.png')}/>

                <Text>{exercise.name}</Text>

                <TouchableOpacity>
                    <Icon className="w-15" name="ellipsis-vertical" type="ionicon" color="black" />
                </TouchableOpacity>

            </TouchableOpacity>
            
        ))}
        

    </View>




      



    </SafeAreaView>
  )
}

export default ExList