import { View, Text ,TouchableOpacity , Image} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { initialData } from '../database/initialData'
import { ScrollView } from 'react-native-gesture-handler'
import { useDatabase } from '../hooks/DatabaseContext'
import { useState , useEffect ,useRef } from 'react'

const SelectExImage = ({group, selectedImage, setNewImage}) => {
  const db = useDatabase();

  const [exImages, setExImages] = useState([]);
  const scrollViewRef = useRef(null);


  useEffect(() => {
    const getGroupExerciseImages = async () => {  
        const query = `
        SELECT * FROM exercise_images
        WHERE muscleGroup = ?;
        `;
        const values = [group];
        const result = await db.getAllAsync(query, values);
        setExImages(result);
    }
    getGroupExerciseImages();
  }, [group]);

  const scrollToElement = (index) => {
    const scrollPosition = index * 20;
    scrollViewRef.current.scrollTo({ x: scrollPosition, animated: false });
  };

  useEffect(() => {
    if (selectedImage) { 
      scrollToElement(selectedImage);
    }
  }, []);


  return (

    <ScrollView horizontal className="px-2" ref={scrollViewRef}>
        <View className="flex-row space-x-1">
        {exImages.map((exercise) => (
            <TouchableOpacity 
            key={exercise.id} 
            onPress={() => setNewImage(exercise.imgIndex)}
            className="bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 rounded-md p-3 mt-10"
            style={{...selectedImage == exercise.imgIndex && {borderWidth: 4, borderColor: '#34C4F1'}}}
            >
                <Image resizeMode="contain" className="w-20 h-20" source={initialData.images[exercise.imgIndex].imgSRC}/>
            </TouchableOpacity>
        ))}
        </View>
    </ScrollView>
  )
}

export default SelectExImage