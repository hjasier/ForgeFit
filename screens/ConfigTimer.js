import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const ConfigTimer = () => {
  const [timerDuration, setTimerDuration] = useState('');

  const navigation = useNavigation();


  useEffect(() => {
    const loadTimerDuration = async () => {
      try {
        const savedDuration = await AsyncStorage.getItem('timerDuration');
        if (savedDuration) {
          setTimerDuration(savedDuration);
        }
        else{
          await AsyncStorage.setItem('timerDuration',90);
        }
      } catch (error) {
        console.error('Error loading timer duration:', error);
      }
    };

    loadTimerDuration();
  }, []);

  const saveNewTimer = async () => {
    try {
      await AsyncStorage.setItem('timerDuration', timerDuration);
      console.log('Timer duration saved:', timerDuration);
      navigation.goBack();
      
    } catch (error) {
      console.error('Error saving timer duration:', error);
    }
  };

  return (
    <SafeAreaView className="items-center justify-center">
      <View className="flex-row space-x-2 items-center justify-center mt-32">
        <Text>Temporizador entre ejs</Text>
        <TextInput
          value={timerDuration}
          onChangeText={setTimerDuration}
          keyboardType="numeric"
          className="w-14 justify-center text-center rounded-md h-9 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"
        />
      </View>

      <View className="items-center mt-4">
        <TouchableOpacity
          onPress={saveNewTimer}
          className="bg-[#171717] w-36 h-10 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-4"
        >
          <Text className="text-white">Guardar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConfigTimer;
