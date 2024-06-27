import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Consum from '../components/Consum'

const Consums = () => {
  return (
    <View className="w-full px-7 mt-1">

      <View className="justify-start flex py-1">
        <Text className="">Hoy</Text>
      </View>


      <ScrollView className="h-48">
          <Consum/>
          <Consum/>
          <Consum/>
          <Consum/>
      </ScrollView>


    </View>
  )
}

export default Consums