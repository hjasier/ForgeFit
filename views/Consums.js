import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Consum from '../components/Consum'
import { useDatabase } from '../hooks/DatabaseContext'
import { useState } from 'react'
import { useEffect, useCallback } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import moment from 'moment'
import { useMacros } from '../hooks/MacrosHook';

const Consums = () => {

  const db = useDatabase();
  const macros = useMacros();

  const [todaysConsums, setTodaysConsums] = useState([]);

  const updateTodaysConsums = async () => {
    const query = `
          SELECT * ,c.id as id, c.weight as weight, c.unit as cunit FROM consums c
          JOIN alims a ON c.alimId = a.id
          WHERE DATE(c.date) = DATE(?);`
    const values = [moment().format('YYYY-MM-DD HH:mm:ss')];
    const updatedConsums = await db.getAllAsync(query, values);
    setTodaysConsums(updatedConsums);
  }

  useEffect(() => {
    if (db) {
      updateTodaysConsums();
    }
  }, [macros.todayMacros]);


  return (
    <View className="w-full px-7 mt-1 mb-9">

      <TouchableOpacity onPress={updateTodaysConsums} className="justify-start flex py-1">
        <Text className="">Hoy</Text>
      </TouchableOpacity>


      <ScrollView className="">
        {todaysConsums.map((consum, index) => (
          <Consum key={index} consum={consum} />
        ))}
      </ScrollView>


    </View>
  )
}

export default Consums