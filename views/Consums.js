import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Consum from '../components/Consum'
import { useDatabase } from '../hooks/DatabaseContext'
import { useState } from 'react'
import { useEffect, useCallback } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import moment from 'moment'


const Consums = () => {

  const db = useDatabase();

  const [todaysConsums, setTodaysConsums] = useState([]);

  const updateTodaysConsums = async () => {
    const query = `
          SELECT * , c.unit as cunit FROM consums c
          JOIN alims a ON c.alimId = a.id
          WHERE DATE(c.date) = DATE(?);`
    const values = [moment().format('YYYY-MM-DD HH:mm:ss')];
    const updatedConsums = await db.getAllAsync(query, values);
    setTodaysConsums(updatedConsums);
  }

  useEffect(() => {
    if (db){
      updateTodaysConsums();
    }
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      if (db){
        updateTodaysConsums();
      }
    }, [db])
  );

  

  return (
    <View className="w-full px-7 mt-1">

      <TouchableOpacity onPress={updateTodaysConsums} className="justify-start flex py-1">
        <Text className="">Hoy</Text>
      </TouchableOpacity>


      <ScrollView className="h-48">
        {todaysConsums.map((consum, index) => (
          <Consum key={index} consum={consum} />
        ))}
      </ScrollView>


    </View>
  )
}

export default Consums