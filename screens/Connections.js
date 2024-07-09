import { View, Text, TouchableOpacity ,Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDatabase } from '../hooks/DatabaseContext'
import { useState } from 'react'
import { Icon } from '@rneui/themed'
import { useNavigation , useIsFocused } from '@react-navigation/native'
import { initialData } from '../database/initialData'

const Connections = () => {

  const db = useDatabase();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [groups, setGroups] = useState([]);


  const getGroups = async () => {
    const query = `
      SELECT * FROM exercise_groups;
    `;
    const result = await db.getAllAsync(query);
    setGroups(result);
  }

  useEffect(() => {
    if (db) {
      getGroups();
    }
  }, [isFocused]);


  return (
    <SafeAreaView className="items-center py-10 px-8 space-y-4">

    
      <Text className="text-center">Vincula ejercicios entre ellos para que cuando uno se complete , el resto también</Text>

        <View>
            <TouchableOpacity onPress={() => navigation.navigate("NewGroup")} className="flex-row  space-x-2 items-center text-center justify-center bg-[#EAEAEA] w-32 h-9 rounded-lg shadow-md shadow-gray-800">
                <Icon size={20} name="plus-square" type="font-awesome-5"/>
                <Text>Nuevo grupo</Text>
            </TouchableOpacity>
        </View>

        {groups.map((group) => (

        <TouchableOpacity 
        
        key={group.id} 
        onPress={() => navigation.navigate("SelectGroupEjs", {group: group})}

        className="bg-[#EAEAEA] flex-row justify-between h-14 w-full items-center px-4 rounded-lg">
          <View className="flex-row items-center">
            <Image resizeMode="contain" className="w-8 h-8" source={initialData.muscleGroups[group.imgSRC].imgSRC} />

            <View className="pl-3 w-56">
                <Text className="text-base">{group.name}</Text>
            </View>
            
          </View>


        </TouchableOpacity>


        ))}

       <View>

       </View>

    </SafeAreaView>
  )
}

export default Connections