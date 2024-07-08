import { View, Text, TouchableNativeFeedback , Image , TouchableOpacity, Animated  } from 'react-native'
import React from 'react'
import { Swipeable } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';
import { useDatabase } from '../hooks/DatabaseContext';
import { useMacros } from '../hooks/MacrosHook';

const Consum = ({consum}) => {

    const db = useDatabase();
    const macros = useMacros();
    
    const handleDeleteItem = () => {
        db.runAsync('DELETE FROM consums WHERE id = ?', [consum.id]);
        macros.updateMacros();
    }

    const rightSwipe = () => (
            <View className="items-center justify-center">
                <TouchableOpacity onPress={() => handleDeleteItem()} className="w-[50] h-14 bg-red-600 justify-center items-center rounded-l-lg">
                    <Icon type='font-awesome-5' name="trash" size={15} color="white" />
                </TouchableOpacity>
            </View>
    );


    return (

    <Swipeable renderRightActions={rightSwipe}>

        <View className="bg-[#EAEAEA] h-14 w-full my-1 px-2 py-2 rounded-lg flex flex-row justify-between items-center">
            
            
            <View className="flex flex-row">

                <Image source={{uri:consum.imgSRC}} className="h-10 w-10 rounded-md"/>
                
            
                <View className="flex flex-col pl-3">
                    
                    <Text>{consum.name}</Text>
                    

                    <View className="flex flex-row space-x-2">
                        <View className="flex flex-row">
                            <Text className="text-[#179BE6]">{parseFloat((consum.kcals * consum.cunit).toFixed(2))}</Text>
                            <Text className="pt-0.5 pl-0.5 text-gray-400 text-xs"> kcal</Text>
                        </View>
                        <View className="flex flex-row">
                            <Text className="text-[#FF4E4E]">{parseFloat((consum.protein * consum.cunit).toFixed(2))}</Text>
                            <Text className="pt-0.5 pl-0.5 text-gray-400 text-xs"> g</Text>
                        </View>

                        <View className="flex flex-row">
                            <Text className="text-[#FFC34E]">{parseFloat((consum.carbs * consum.cunit).toFixed(2))}</Text>
                            <Text className="pt-0.5 pl-0.5 text-gray-400 text-xs"> g</Text>
                        </View>
                    </View>

                </View>

            </View>




            
            <Text className="px-1 text-gray-500">{consum.weight} {consum.unit}</Text>


        </View>


    </Swipeable>


  )
}

export default Consum