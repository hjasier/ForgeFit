import { View, Text, Touchable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SelectorRutina from '../components/SelectorRutina'
import { useState } from 'react'
import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ListaEjersConfig from '../components/ListaEjersConfig'
import { useNavigation } from '@react-navigation/native'
import { Icon } from '@rneui/base'

const ConfigRoutines = () => {

  const navigation = useNavigation();
  const [rutina, setRutina] = useState(null);


  return (
    <SafeAreaView>

      <View className="items-center space-y-3 pt-5 flex-row justify-between">
        <View className="w-20"/>
        <Text>Mis Rutinas</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CreateRoutine")} className="w-20">
          <Icon size={30} name="plus-square" color={"#8A8A8A"} type="font-awesome-5"/>
        </TouchableOpacity>
      </View>

      <View className="items-center mt-5 w-full px-8">
          <SelectorRutina set={0} rutina={rutina} setRutina={setRutina} />
      </View>

      {rutina && (
      <>
      <View className="items-center py-5">
        <TouchableOpacity onPress={()=> navigation.navigate("SelectRoutineEjs",{routine:rutina})} 
        className="items-center text-center justify-center bg-[#EAEAEA] w-32 h-9 rounded-lg shadow-md shadow-gray-800">
          <Text>Editar Ejercicios</Text>
        </TouchableOpacity>
      </View>

      <View className="">
        <ListaEjersConfig rutina={rutina}/>
      </View>
      </>
      )}

    </SafeAreaView>
  )
}

export default ConfigRoutines