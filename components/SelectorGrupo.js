import { View, Text } from 'react-native'
import React from 'react'
import { Image , TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'


const SelectorGrupo = ({group , setGroup}) => {

  const listaRutinasDEMO = {
    0: "Pecho",
    1: "Espalda",
    2: "Hombros",
    3: "Sholders",

  }

  return (

    <ScrollView horizontal className="flex-row space-x-3">
      {Object.keys(listaRutinasDEMO).map((grup, index) => (
        <TouchableOpacity onPress={() => setGroup(index)} key={index} 
        
        style={group == index ? { backgroundColor: "#FFD700" } : { backgroundColor: "#d9d9d93e" }}


        className="w-16 h-20 rounded-xl items-center justify-center drop-shadow-md shadow-gray-700 ">
          <Image className="w-10 h-10" source={require('../assets/testEx.png')} />
          <Text>{listaRutinasDEMO[grup]}</Text>
        </TouchableOpacity>
        ))}
    </ScrollView>
  )
}

export default SelectorGrupo