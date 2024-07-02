import { View, Text } from 'react-native'
import React from 'react'
import { Image , TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'


const SelectorRutina = ({rutina , setRutina}) => {

  
  const listaRutinasDEMO = {
    0: "Push",
    1: "Pull",
    2: "Legs",
    3: "FullBody",
    4: "PushPull",
    5: "PushLegs",
    6: "PullLegs",
  }


  return (

    <ScrollView horizontal className="flex-row space-x-2">
      {Object.keys(listaRutinasDEMO).map((rut, index) => (
        <TouchableOpacity onPress={() => setRutina(index)} key={index} 
        
        style={rutina == index ? { backgroundColor: "#FFD700" } : { backgroundColor: "#d9d9d93e" }}


        className="w-20 h-20 rounded-xl items-center justify-center drop-shadow-md shadow-gray-700 ">
          <Image className="w-10 h-10" source={require('../assets/testEx.png')} />
          <Text>{listaRutinasDEMO[rut]}</Text>
        </TouchableOpacity>
        ))}
    </ScrollView>
  )
}

export default SelectorRutina