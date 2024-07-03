import { View, Text , Image , TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed'

const ListaEjers = () => {

  const navigation = useNavigation();

  const listaEjersDEMO = {
    0: "Press Banca",
    1: "Press Militar",
    2: "Press Arnold",
    3: "Press Inclinado",
    4: "Press Declinado",
    5: "Press Banca",
    6: "Press Militar",
    7: "Press Arnold",
    8: "Press Inclinado"
  }


  return (
    <ScrollView className="w-full h-[505]">
      <View className="w-full pb-24 px-6 space-y-3">
      {Object.keys(listaEjersDEMO).map((ej, index) => (
        <TouchableOpacity onPress={() => navigation.navigate("SaveEjDone")} key={index} 
        className="flex-row justify-between bg-[#EAEAEA] h-14 w-full items-center px-4 rounded-lg">
          <View className="flex-row space-x-3 items-center">
            <Image className="w-8 h-8" source={require('../assets/testEx.png')} />
            <Text className="text-base">{listaEjersDEMO[ej]}</Text>
          </View>
          <TouchableOpacity>
            <Icon size={20} name="history" type="font-awesome-5"/>
          </TouchableOpacity>

        </TouchableOpacity>
      ))}
      </View>


    </ScrollView>



  )
}

export default ListaEjers