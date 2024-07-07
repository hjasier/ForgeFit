import { View, Text } from 'react-native'
import React, { useEffect , useState} from 'react'
import { Image , TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDatabase } from '../hooks/DatabaseContext'
import { initialData } from '../database/initialData'

const SelectorGrupo = ({group , setGroup}) => {


  const db = useDatabase();

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

  return (

    <ScrollView horizontal className="flex-row space-x-3">
      {groups.map((grup) => (
        <TouchableOpacity onPress={() => setGroup(grup.id)} key={grup.id} 
        
        style={group == grup.id ? { backgroundColor: "#FFD700" } : { backgroundColor: "#d9d9d93e" }}


        className="w-16 h-20 rounded-xl items-center justify-center drop-shadow-md shadow-gray-700 ">
          <Image className="w-10 h-10" resizeMode="contain" source={initialData.muscleGroups[grup.id].imgSRC} />
          <Text>{grup.name}</Text>
        </TouchableOpacity>
        ))}
    </ScrollView>
  )
}

export default SelectorGrupo