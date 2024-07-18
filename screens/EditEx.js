import { View, Text , TextInput , Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectorGrupo from '../components/SelectorGrupo';
import { useState  } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { initialData } from '../database/initialData';
import SelectExImage from '../components/SelectExImage';
import { useDatabase } from '../hooks/DatabaseContext';

const EditEx = ({route}) => {

  const navigation = useNavigation();
  const db = useDatabase();

  const exercise = route.params.exercise;
  const [group, setGroup] = useState(exercise.muscleGroup);
  const [newName, setNewName] = useState(exercise.name);
  const [newImage, setNewImage] = useState(exercise.imgSRC);
  
  const handleEditEx = () => {
    updateExData();
    navigation.goBack();
  }

  const updateExData = async () => {
    const query = `
      UPDATE exercises
      SET name = ?,
          imgSRC = ?,
          muscleGroup = ?
      WHERE id = ?;
    `;
    const values = [newName, newImage, group, exercise.id];
    await db.runAsync(query, values);
  }
  

  return (
    <SafeAreaView className="py-10">

    <View className="px-8 py-5 items-center">
        <SelectorGrupo group={group} setGroup={setGroup} />
    </View>

    <View className="items-center">

    <TextInput 
      value={newName}
      onChangeText={setNewName}
      placeholder="Nombre del ejercicio" 
      className="w-52 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>
    
    <SelectExImage group={group} selectedImage={newImage}  setNewImage={setNewImage} />
    

    <TouchableOpacity onPress={handleEditEx} className="px-3 bg-[#171717] h-12 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-16">
      <Text className="text-white">Guardar cambios</Text>
    </TouchableOpacity>

    

    </View>


    




    </SafeAreaView>

  )
}

export default EditEx