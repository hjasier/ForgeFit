import { View, Text,TouchableOpacity , Image } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import MenuNavBar from '../components/MenuNavBar';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useDatabase } from '../hooks/DatabaseContext';
import { initialData } from '../database/initialData';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTimer } from '../hooks/TimerHook';


const SaveEjDone = ({route}) => {

  const navigation = useNavigation();
  const exercise = route.params.exercise;
  const db = useDatabase();
  const timer = useTimer();

  const [numSets, setNumSets] = useState(1);
  const scrollViewRef = useRef(null);

  const [setsData, setSetsData] = useState(
    Array.from({ length: 20 }, () => ({ peso: '', reps: '' })) // 20 sets max
  );


  const handleInputChange = (index, field, value) => {
    const updatedSets = setsData.map((set, i) => (
      i === index ? { ...set, [field]: value } : set
    ));
    setSetsData(updatedSets);
  };

  const addNewSet = () => {
    setNumSets(numSets + 1);

    setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
    
  };

  const removeLastSet = () => {
    if (numSets > 1) {
        setNumSets(numSets - 1);
    }
  };

    const handleSaveSet = async () => {
        if (setsData[0].peso === '' || setsData[0].reps === '') {
          return;
        }
        
        const main_set_id = Math.floor(Math.random() * 100000000);

        try {
            if (db) {
              const query = `
                INSERT INTO sets
                (id, exercise_id, weight, reps, date, isMainSet)
                VALUES (?, ?, ?, ?, ?, 1);
              `;
            const values = [main_set_id, exercise.id ,setsData[0].peso, setsData[0].reps, moment().format('YYYY-MM-DD HH:mm:ss')];

            await db.runAsync(query, values); 

            //Insert dropsets
            for (let i = 1; i < numSets; i++) {
              const drop_set_id = Math.floor(Math.random() * 100000000);
              const setsinsertQuery = `
                INSERT INTO sets
                (id, exercise_id, weight, reps, isMainSet)
                VALUES (?, ?, ?, ? , 0);
              `;
              const dropSetValues = [drop_set_id, exercise.id, setsData[i].peso, setsData[i].reps];
              await db.runAsync(setsinsertQuery, dropSetValues);

              const query = `
                INSERT INTO dropsets
                (main_set_id, drop_set_id, set_order)
                VALUES (?, ?, ?);
              `;
              const values = [main_set_id, drop_set_id, i];
              await db.runAsync(query, values);
            }

            }

            timer.reset();

          } catch (error) {
            console.error("Error al insertar el set:", error);
            return;
          } finally {
            navigation.goBack();
          }
    }

  return (
    <SafeAreaView>
      

        {/* NavBar */}
        <MenuNavBar>
            <View className="justify-between flex-row w-full px-6 items-center">
                <TouchableOpacity onPress={() => navigation.navigate("ExHistory",{exercise:exercise})}>
                    <Icon className="w-15" name="history" type="font-awesome-5" color="white" />
                </TouchableOpacity>
                <Text></Text>
                <TouchableOpacity>
                  <Text className="w-15 font-extrabold text-xl text-white">{timer.format}</Text>
                </TouchableOpacity>
            </View>
        </MenuNavBar> 


        <ScrollView ref={scrollViewRef} className="h-screen">

        <View className="px-12 py-10 pb-32">

            <View className="flex-row items-center space-x-4 justify-center mb-16">
                <Image resizeMode='contain' className="w-12 h-12" source={initialData.images[exercise.imgSRC].imgSRC} />
                <Text className="text-base">{exercise.name}</Text>
            </View>
            

            {Array.from({length: numSets}, (_, i) => (
                    
            <View key={"div-"+i} className="space-y-3 mb-3">

                {i > 0 && (
                <View className="justify-between flex-row">
                    <TouchableOpacity onPress={removeLastSet} className="w-20 h-8 bg-[#EAEAEA] items-center justify-center rounded-lg">
                            <Text>DropSet {i}</Text>
                    </TouchableOpacity>
                    {i+2 > numSets && (
                    <TouchableOpacity onPress={removeLastSet} className="w-20 h-8 bg-[#EAEAEA] items-center justify-center rounded-lg">
                        <Text>Eliminar</Text>
                    </TouchableOpacity>
                    )}
                    
                </View>
                )}
                
                <View className="items-center space-y-3">
                    <View className="flex-row items-center space-x-4">
                        <Text>Peso</Text>
                        <TextInput 
                        onChangeText={(value) => handleInputChange(i, 'peso', value)}
                        keyboardType="numeric" className="bg-[#EAEAEA] h-12 w-24 rounded-lg text-center" placeholder="0"/>
                    </View>

                    <View className="flex-row items-center space-x-4">
                        <Text>Reps</Text>
                        <TextInput 
                        onChangeText={(value) => handleInputChange(i, 'reps', value)}
                        keyboardType="numeric" className="bg-[#EAEAEA] h-12 w-24 rounded-lg text-center" placeholder="0"/>
                    </View>
                </View>


                

            </View>

            ))}




            <View className="flex-row space-x-2 mt-10 justify-center">
                <TouchableOpacity onPress={addNewSet} className="w-20 h-8 bg-[#EAEAEA] items-center justify-center rounded-lg">
                    <Text>DropSet</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSaveSet} className="w-20 h-8 bg-[#171717] items-center justify-center rounded-lg">
                    <Text className="text-white">Guardar</Text>
                </TouchableOpacity>
            </View>
            
        
        </View>
        </ScrollView>

        


        






    </SafeAreaView>
  )
}

export default SaveEjDone