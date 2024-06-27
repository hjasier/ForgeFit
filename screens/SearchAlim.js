import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Consum from '../components/Consum'

const SearchAlim = () => {
  return (
    <SafeAreaView className="my-2">
      
      <View className="px-8 mt-4">
        <TextInput placeholder="🔍 Buscar" className="rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-6"/>
      </View>

      <ScrollView className="h-96 px-5 mt-8">
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
        <Consum/>
      </ScrollView>

      
    </SafeAreaView>


  )
}

export default SearchAlim