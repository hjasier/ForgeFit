import { View, Text , TextInput, TouchableOpacity ,Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { useDatabase } from '../hooks/DatabaseContext'
import { useNavigation } from '@react-navigation/native'
import SelecteRoutineImage from '../components/SelectRoutineImage'

const NewGroup = () => {
    const [name , setName] = useState("");
    const db = useDatabase();
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(0);
  
    const handleSaveGroup = async () => {
      if (name !== "") {
          try {
              if (db) {
                const result = await db.getAllAsync(`SELECT * FROM exercise_groups WHERE name = ?;`, [name]);
                if (result.length === 0) {
                  const query = `
                    INSERT INTO exercise_groups 
                    (name,imgSRC)
                    VALUES (?,?)
                  `;
                  const values = [name, selectedImage];
                  await db.runAsync(query, values);
                  navigation.goBack();
                }
                else {
                  Alert.alert("Error", "Ya existe un grupo con ese nombre");
                  return;
                }
            }
            } catch (error) {
              console.error("Error al insertar rutina", error);
              return;
            }
            finally {
              //navigation.goBack();
            }
      }
    }
  
  
    return (
      <SafeAreaView className="py-10">
  
      <Text className="pb-10 items-center text-center">Crear Nueva Rutina</Text>
      <View className="items-center">
  
      <TextInput 
        value={name}
        onChangeText={setName}
        placeholder="Nombre del grupo " 
        className="w-52 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"/>
  
      <SelecteRoutineImage selectedImage={selectedImage} setNewImage={setSelectedImage}/>
  
      <TouchableOpacity onPress={handleSaveGroup} className="px-3 bg-[#171717] h-12 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-16">
        <Text className="text-white">Guardar cambios</Text>
      </TouchableOpacity>
  
      
  
      </View>
  
  
      </SafeAreaView>
    )
}

export default NewGroup