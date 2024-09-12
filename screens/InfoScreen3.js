import { View, Text , Image } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native';
import { Icon } from '@rneui/base'


const InfoScreen3 = () => {

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle('dark-content', true);
            StatusBar.setBackgroundColor('#F3F3F2', true);
        }, [])
    );

    const navigation = useNavigation();


  return (
    <SafeAreaView className="items-center py-16 px-6">
        <Text className="text-[#36BFF9] font-black text-4xl ">
            Gym
        </Text>

        <View className="py-8">

        
            <View className="items-center space-y-2">
                <Text className=" text-center">
                    Los entrenamientos están organizados mediante rutinas 
                </Text>

                <Text className=" text-center">
                    Puedes crear todas las rutinas que quieras
                </Text>

                <Text className=" text-center">
                    A cada rutina puedes añadir tantos ejercicios como quieras
                </Text>

                <Text className=" text-center">
                    Tienes 90 ejercicios ya configurados , puedes crear más si los necesitas.
                </Text>
                
            </View>


            <View className="items-center space-y-4 mt-6">
                <Text className=" text-center">
                    Las conexiones entre ejercicios sirven para completar varios ejercicios a la vez , es decir si en tu rutina tienes multiples opciones para un mismo grupo musuclar , ej: Press banca / Press banca en multipower , puedes configurar un grupo de conexión entre dos o más ejercicios y cuando completes uno de ellos se marcará como completado el otro también.
                </Text>

                <Text className=" text-center">
                También es recomendable configurar la sección semana , asi cuando entres en el apartado ejercicios , ya estará preparado con tu rutina de hoy. 
                </Text>

                <Text className=" text-center">
                <Text className="font-bold">TIP:</Text>  En el input de peso puedes escribir operaciones matemáticas para no tener que calcularlo de cabeza , ej: he hecho 1a dropset y he quitado 15kg , puedes escribir  90 - 15
                </Text>
                
            </View>




        </View>



        <TouchableOpacity onPress={() => navigation.navigate("UserStats")} className="bg-[#36BFF9] py-3 px-6 rounded-md flex-row space-x-3">
            <Text className="text-white font-bold">
                Cerrar
            </Text>
            
        </TouchableOpacity>


    </SafeAreaView>
  )
}

export default InfoScreen3