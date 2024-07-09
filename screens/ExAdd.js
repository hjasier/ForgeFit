import { View, Text , TouchableOpacity , TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SelectorGrupo from '../components/SelectorGrupo'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDatabase } from '../hooks/DatabaseContext'
import SelectExImage from '../components/SelectExImage'

const ExAdd = () => {
  
    const navigation = useNavigation();
    const db = useDatabase();
  
    const [group, setGroup] = useState(0);
    const [newName, setNewName] = useState('');
    const [newImage, setNewImage] = useState(-1);
    

    const saveExData = async () => {
        const query = `
          INSERT INTO exercises (name, imgSRC, muscleGroup)
          VALUES (?, ?, ?);
        `;
        const values = [newName, newImage, group];
        await db.runAsync(query, values);
    }


    const handleSaveEx = async () => {
        await saveExData();
        navigation.goBack();
    }

  
    return (
      <SafeAreaView className="py-10">
  
      <View className="px-8 py-5 items-center">
          <SelectorGrupo group={group} setGroup={setGroup} />
      </View>
  
      <View className="items-center">
  
      <TextInput 
        onChangeText={setNewName}
        placeholder="Nombre del ejercicio" 
        className="w-52 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>
      
      <SelectExImage group={group} selectedImage={newImage}  setNewImage={setNewImage} />
      
  
      <TouchableOpacity onPress={handleSaveEx}  className="px-3 bg-[#171717] h-12 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-16">
        <Text className="text-white">Guardar ejercicio</Text>
      </TouchableOpacity>
  
      
  
      </View>
  
  
      
  
  
  
  
      </SafeAreaView>
  )
}

export default ExAdd