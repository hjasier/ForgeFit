import { View, Text , Image } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { StatusBar } from 'react-native';
import { Icon } from '@rneui/base'


const InfoScreen1 = () => {

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
            ¡Hola!
        </Text>

        <Image source={require('../assets/splash.png')}  className="h-96 w-96 rounded-md -mt-24"/>

        <View className="-mt-24 items-center">
            <Text className=" text-center">
                Esta aplicación no guarda ningún registro en la nube, todos los datos son guardados en el propio dispositivo para que seas tú el único propietario. 
            </Text>

            <Text className="text-center mt-7">
                En caso de querer transladar los datos a otro dispositivo es posible guardar y importar una copia de segurdad desde el menu de configuración.
            </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("InfoScreen2")} className="mt-20 bg-[#36BFF9] py-3 px-6 rounded-md flex-row space-x-3">
            <Text className="text-white font-bold">
                Siguiente
            </Text>
            <Icon size={18} name="arrow-right" type="font-awesome-5" color="white" />

        </TouchableOpacity>


    </SafeAreaView>
  )
}

export default InfoScreen1