import { View, Text , TextInput , Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectorGrupo from '../components/SelectorGrupo';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const EditEx = ({route}) => {

  const navigation = useNavigation();

  const exercise = route.params.exercise;
  const [group, setGroup] = useState(exercise.muscleGroup);
  const [newName, setNewName] = useState(exercise.name);
  
  const handleEditEx = () => {
    console.log("Editando ejercicio");
    navigation.goBack();
  }

  return (
    <SafeAreaView className="py-10">

    <View className="px-8 py-5 items-center">
        <SelectorGrupo group={group} setGroup={setGroup} />
    </View>

    <View className="items-center">

    <TextInput 
      value={exercise.name}
      onChangeText={setNewName}
      placeholder="Nombre del ejercicio" 
      className="w-52 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>

    <TouchableOpacity className="bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 rounded-md p-3 mt-10">
      <Image className="w-20 h-20" source={require('../assets/testEx.png')}/>
    </TouchableOpacity>

    <TouchableOpacity onPress={handleEditEx} className="px-3 bg-[#171717] h-12 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-16">
      <Text className="text-white">Guardar cambios</Text>
    </TouchableOpacity>

    

    </View>


    




    </SafeAreaView>

  )
}

export default EditEx