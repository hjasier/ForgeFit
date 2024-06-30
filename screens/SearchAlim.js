import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Consum from '../components/Consum'
import ConsumSearch from '../components/ConsumSearch'
import setupAlimDB from '../database/alimDB'
import { useDatabase } from '../hooks/DatabaseContext'

const SearchAlim = () => {

  const db = useDatabase();
  const taskNameInputRef = useRef();
  const [alimList, setAlimList] = useState([]);

  const [selectedOption, setSelectedOption] = useState(0);

  const options = [
    'Todos',
    'Mios',
    'OpenFoodFacts',
    'Nutrionix'
  ];

  // Función para enfocar el TextInput cuando se monta el componente o se muestra el modal
  const focusTaskNameInput = () => {
    if (taskNameInputRef.current) {
      taskNameInputRef.current.focus();
    }
  };


  // Llama a la función cuando el componente se monta o el modal se muestra
  useEffect(() => {
    setTimeout(() => {
      focusTaskNameInput();
    }, 100);
  }, []);

  useEffect(() => {
    async function getAlimList() {
      const alims = await db.getAllAsync('SELECT * FROM alims');
      setAlimList(alims);
    }

    getAlimList();
  }, []);


  return (
    <SafeAreaView className="my-2">
      
      <View className="px-8 mt-4">
        <TextInput ref={taskNameInputRef} placeholder="🔍 Buscar" className="rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-6"/>
      </View>

      <View className="flex-row mt-5 space-x-1 items-center justify-center">
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          className={`bg-[#EAEAEA] h-9 px-4 justify-center items-center rounded-2xl ${selectedOption === index ? 'bg-[#FFD700] shadow-md shadow-yellow-300' : ''}`}
          onPress={() => setSelectedOption(index)}
        >
          <Text className="text-xs">{option}</Text>
        </TouchableOpacity>
      ))}
    </View>

      <ScrollView className="px-5 mt-5">
        <View className="pb-28">
          
        {alimList.map((alim) => (
          
          <ConsumSearch alim={alim} key={alim.id}/>

        ))}

        </View>
      </ScrollView>

      
    </SafeAreaView>


  )
}

export default SearchAlim