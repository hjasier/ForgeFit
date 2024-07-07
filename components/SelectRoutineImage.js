import { View, Text ,TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { initialData } from '../database/initialData'
import { ScrollView } from 'react-native-gesture-handler'
import { useDatabase } from '../hooks/DatabaseContext'
import { useState , useEffect ,useRef } from 'react'

const SelectExImage = ({selectedImage, setNewImage}) => {

  const db = useDatabase();
  const scrollViewRef = useRef(null);


  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const query = `
      SELECT * FROM muscleGroup;
      `;
      const result = await db.getAllAsync(query);
      setGroups(result);
    }
    getGroups();
  }
  , []);



  useEffect(() => {
    console.log(selectedImage);
    if (selectedImage) {
      
      scrollToElement(selectedImage);
    }
  }, []);


  return (

    <ScrollView horizontal className="px-2" ref={scrollViewRef}>
        <View className="flex-row space-x-1">
        {groups.map((grup) => (
            <TouchableOpacity 
            key={grup.id} 
            onPress={() => setNewImage(grup.id)}
            className="bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 rounded-md p-3 mt-10"
            style={{...selectedImage == grup.id && {borderWidth: 4, borderColor: '#34C4F1'}}}
            >
                <Image resizeMode="contain" className="w-20 h-20" source={initialData.muscleGroups[grup.id].imgSRC}/>
            </TouchableOpacity>
        ))}
        </View>
    </ScrollView>
  )
}

export default SelectExImage