import { View, Text ,Image , TouchableOpacity , Modal , Button} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SelectorGrupo from '../components/SelectorGrupo'
import { useState , useRef } from 'react'
import { useDatabase } from '../hooks/DatabaseContext'
import { ScrollView } from 'react-native-gesture-handler'
import { Icon } from '@rneui/themed'
import { useNavigation , useIsFocused} from '@react-navigation/native'
import { initialData } from '../database/initialData'
import { Menu, MenuItem, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
const ExList = () => {

  const db = useDatabase();
  const navigation = useNavigation();

  const [group, setGroup] = useState(0);
  const [exercises, setExercises] = useState([]);
  const menuRef = useRef();
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const isFocused = useIsFocused();

  const getExercises = async () => {
    const query = `
      SELECT * FROM exercises
      WHERE muscleGroup = ?
    `;
    const values = [group];
    const result = await db.getAllAsync(query, values);
    setExercises(result);
  }

  useEffect(() => {
    if (db) {
      getExercises();
    }
  }, [group,isFocused]);



  const deleteExercise = () => {
    // Eliminar ejercicio
    db.runAsync('DELETE FROM exercises WHERE id = ?', [selectedExercise.id]);
    setShowDeleteConfirmation(false); 
    getExercises();
  };

  

  return (
    <SafeAreaView className="py-10">
      
    <View className="items-center">
        <Text >Selecciona un grupo muscular</Text>
    </View>

    <View className="px-8 py-5 items-center">
        <SelectorGrupo group={group} setGroup={setGroup} />
    </View>




    <ScrollView className="w-full px-7">

        <View className="space-y-3 pb-48">        
        {exercises.map((exercise) => (

            <TouchableOpacity onPress={() => navigation.navigate("EditEx",{exercise:exercise})} key={exercise.id} className="flex-row justify-between bg-[#EAEAEA] h-14 w-full items-center px-4 rounded-lg">
                <Image resizeMode="contain" className="w-8 h-8" source={initialData.images[exercise.imgSRC].imgSRC}/>

                <Text>{exercise.name}</Text>

                
                    {/* Menú emergente */}
                    <Menu>
                      <MenuTrigger>
                        <Icon className="w-15" name="ellipsis-vertical" type="ionicon" color="black" />
                      </MenuTrigger>
                      
                      <MenuOptions customStyles={{ optionsContainer: { borderRadius: 8 , width:130} }}>
                        <MenuOption onSelect={() => navigation.navigate("EditEx",{exercise:exercise})} >
                          <View className="flex-row text-center items-center px-2">
                              <Icon size={16} name="pencil" type="ionicon" />
                              <Text className="p-1 pl-2">Editar</Text>
                          </View>
                        </MenuOption>
                        
                        <MenuOption onSelect={() => {
                          setSelectedExercise(exercise);
                          setShowDeleteConfirmation(true);
                        }}>
                          <View className="flex-row text-center items-center px-2">
                            <Icon size={16} name="trash" type="ionicon" color="red" />
                            <Text className="p-1 pl-2 text-red-600">Eliminar</Text>
                          </View>
                        </MenuOption>

                      </MenuOptions>
                    </Menu>
                    
                



            </TouchableOpacity>
            
        ))}
        </View>
        

    </ScrollView>


     {/* Modal de confirmación para eliminar */}
     {selectedExercise &&
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteConfirmation}
        onRequestClose={() => setShowDeleteConfirmation(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>¿Eliminar {selectedExercise.name} ?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button title="Cancelar" onPress={() => setShowDeleteConfirmation(false)} />
              <Button title="Eliminar" color="red" onPress={deleteExercise} />
            </View>
          </View>
        </View>
      </Modal>
    }



      



    </SafeAreaView>
  )
}

export default ExList