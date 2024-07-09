import { View, Text , TouchableOpacity , Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed'
import { FontAwesome } from '@expo/vector-icons';
import BtnStats from '../components/BtnStats';


const BotoneraStats = () => {

  const navigation = useNavigation();


  return (
    <ScrollView className="w-full h-[505]">
    <View className="w-full pb-24 px-6 space-y-3">
    
      
      <BtnStats text="Lista de ejercicios" icon={"list-alt"} iconType={"font-awesome"} path={"ExList"} />

      <BtnStats text="Configurar Semana" icon={"calendar-alt"} iconType={"font-awesome-5"} path={"ConfigWeek"} />

      <BtnStats text="Configurar User" icon={"user"} iconType={"font-awesome"} path={"SetupUser"} />

      <BtnStats text="Configurar Conexiones" icon={"transit-connection-variant"} iconType={"material-community"} path={"Connections"} />





    </View>


  </ScrollView>
  )
}

export default BotoneraStats