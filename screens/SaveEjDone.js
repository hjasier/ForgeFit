import { View, Text,TouchableOpacity , Image } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import MenuNavBar from '../components/MenuNavBar';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';


const SaveEjDone = () => {

  const navigation = useNavigation();

  const [numSets, setNumSets] = useState(1);
  const scrollViewRef = useRef(null);

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

  return (
    <View>


        {/* NavBar */}
        <MenuNavBar>
            <View className="justify-between flex-row w-full px-6 items-center">
                <TouchableOpacity>
                    <Icon className="w-15" name="history" type="font-awesome-5" color="white" />
                </TouchableOpacity>
                <Text></Text>
                <TouchableOpacity>
                  <Text className="w-15 font-extrabold text-xl text-white">1:33</Text>
                </TouchableOpacity>
            </View>
        </MenuNavBar> 

        <ScrollView ref={scrollViewRef} className="h-screen">

        <View className="px-12 py-10 pb-32">

            <View className="flex-row items-center space-x-4 justify-center mb-16">
                <Image className="w-12 h-12" source={require('../assets/testEx.png')} />
                <Text className="text-base">Press banca</Text>
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
                        <TextInput keyboardType="numeric" className="bg-[#EAEAEA] h-12 w-24 rounded-lg text-center" placeholder="0"/>
                    </View>

                    <View className="flex-row items-center space-x-4">
                        <Text>Reps</Text>
                        <TextInput keyboardType="numeric" className="bg-[#EAEAEA] h-12 w-24 rounded-lg text-center" placeholder="0"/>
                    </View>
                </View>


                

            </View>

            ))}




            <View className="flex-row space-x-2 mt-10 justify-center">
                <TouchableOpacity onPress={addNewSet} className="w-20 h-8 bg-[#EAEAEA] items-center justify-center rounded-lg">
                    <Text>DropSet</Text>
                </TouchableOpacity>

                <TouchableOpacity className="w-20 h-8 bg-[#171717] items-center justify-center rounded-lg">
                    <Text className="text-white">Guardar</Text>
                </TouchableOpacity>
            </View>
            
        
        </View>
        </ScrollView>

        


        






    </View>
  )
}

export default SaveEjDone