import { View, Text , TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker';
import { useDatabase } from '../hooks/DatabaseContext';
import { useNavigation } from '@react-navigation/native';
import { useMacros } from '../hooks/MacrosHook';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SetupUser = () => {

    const db = useDatabase();
    const navigation = useNavigation();
    const macros = useMacros();
        
    const [selectedGender, setSelectedGender] = useState(''); 
    const [selectedActivity, setSelectedActivity] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [isFirstTime, setIsFirstTime] = useState(true);

    useEffect(() => {
        const getUserInfo = async () => {
            if (db) {
                const query = `SELECT * FROM user LIMIT 1`;
                const result = await db.getAllAsync(query);
                if (result[0]) {
                    setIsFirstTime(false);
                    setAge(result[0].age);
                    setHeight(result[0].height);
                    setSelectedGender(result[0].gender);
                    setSelectedActivity(result[0].activity);
                    setSelectedGoal(result[0].goal);

                }
            }
        }
        getUserInfo();
    },[]);



    const handleSaveUserData = async () => {
        if (db) {
            
            const query = `
            INSERT INTO user (id , name ,age, gender, activity, goal , height)
            VALUES
            (0 , 'user' , ? , ? , ? , ? , ?);
            `;
            const values = [age, selectedGender, selectedActivity, selectedGoal, height];
            await db.runAsync(query, values);

            const query2 = `INSERT INTO weight (weight) VALUES (?);`;
            await db.runAsync(query2, [weight]);
        }
        macros.calcTodayMacros();
        navigation.navigate("Macros");
        await AsyncStorage.setItem('timerDuration', 90);
    }

    const handleUpdateUserData = async () => {
        if (db) {
            const query = `
            UPDATE user 
            SET age = ?, 
                gender = ?, 
                activity = ?, 
                goal = ?, 
                height = ?
            WHERE id = 0
            `;
            const values = [age, selectedGender, selectedActivity, selectedGoal, height];
            await db.runAsync(query, values);
            macros.calcTodayMacros();
        }
        navigation.goBack();
    }


  return (
    <SafeAreaView className="items-center py-5">
    
        <View className="items-center px-9 my-6">
            <Text className="text-center ">Introduce los siguientes datos para poder calcular los macros</Text>
        </View>

        <View className="flex-row space-x-10 items-center justify-between mt-5">
            <Text>Edad</Text>
            <TextInput 
            value={age.toString()}
            onChangeText={setAge}
            placeholder="Edad" 
            keyboardType='numeric'
            className="w-20 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"
            />
        </View>

        <View className="flex-row space-x-4 items-center justify-between mt-5">
            <Text>Altura cm</Text>   
            <TextInput 
            value={height.toString()}
            onChangeText={setHeight}
            placeholder="Altura" 
            keyboardType='numeric'
            className="w-20 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"
            />
        </View>


        { isFirstTime &&
        (
            <View className="flex-row space-x-4 items-center justify-between mt-5">
            <Text>Peso kg</Text>   
            <TextInput 
            value={weight.toString()}
            onChangeText={setWeight}
            placeholder="Peso" 
            keyboardType='numeric'
            className="w-20 justify-center text-center  rounded-md h-11 bg-[#EAEAEA] shadow-md shadow-gray-700 py-0.5 px-3"
            />
            </View>
        )
        }

        <View className="flex-row space-x-4 items-center justify-center mt-5">
            <Picker
                selectedValue={selectedGender} 
                onValueChange={(itemValue) => setSelectedGender(itemValue)}
                style={{ height: 50, width: 300 }}
                className="bg-[#EAEAEA] shadow-md shadow-gray-700 rounded-md"
                >
                <Picker.Item label="Selecciona Genero" value="" />
                <Picker.Item label="Masculino" value="male" />
                <Picker.Item label="Femenino" value="female" />
                <Picker.Item label="Unicornio" value="male" />
                <Picker.Item label="Helicóptero Apache" value="male" />
            </Picker>
        </View>


        <View className="flex-row space-x-4 items-center justify-center mt-5">
            <Picker
                selectedValue={selectedActivity} 
                onValueChange={(itemValue) => setSelectedActivity(itemValue)}
                style={{ height: 50, width: 300 }}
                className="bg-[#EAEAEA] shadow-md shadow-gray-700 rounded-md"
                >
                <Picker.Item label="Nivel de actividad" value="" />
                <Picker.Item label="Tasa Metabólica Basal (BMR)" value="BMR" />
                <Picker.Item label="Sedentario: poco o ningún ejercicio" value="Sedentary" />
                <Picker.Item label="Ligero: ejercicio 1-3 veces/semana" value="Light" />
                <Picker.Item label="Moderado: ejercicio 4-5 veces/semana" value="Moderate" />
                <Picker.Item label="Activo: ejercicio diario o ejercicio intenso 3-4 veces/semana" value="Active" />
                <Picker.Item label="Muy Activo: ejercicio intenso 6-7 veces/semana" value="VeryActive" />
                <Picker.Item label="Extra Activo: ejercicio muy intenso diario, o trabajo físico" value="ExtraActive" />
            </Picker>
        </View>

        <View className="flex-row space-x-4 items-center justify-center mt-5">
            <Picker
                selectedValue={selectedGoal} 
                onValueChange={(itemValue) => setSelectedGoal(itemValue)}
                style={{ height: 50, width: 300 }}
                className="bg-[#EAEAEA] shadow-md shadow-gray-700 rounded-md"
                >
                <Picker.Item label="Objetivo" value="" />
                <Picker.Item label="Mantener peso" value="MaintainWeight" />
                <Picker.Item label="Pérdida leve de peso de 0.25 kg por semana" value="MildWeightLoss" />
                <Picker.Item label="Pérdida de peso de 0.5 kg por semana" value="WeightLoss" />
                <Picker.Item label="Pérdida extrema de peso de 1 kg por semana" value="ExtremeWeightLoss" />
                <Picker.Item label="Ganancia leve de peso de 0.25 kg por semana" value="MildWeightGain" />
                <Picker.Item label="Ganancia de peso de 0.5 kg por semana" value="WeightGain" />
                <Picker.Item label="Ganancia extrema de peso de 1 kg por semana" value="ExtremeWeightGain" />
            </Picker>
        </View>

        { isFirstTime ? (
        <TouchableOpacity onPress={handleSaveUserData} className="w-52 bg-[#171717] h-10 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-4">
                <Text className="text-white">Continuar</Text>
        </TouchableOpacity>
        ) : (
            <TouchableOpacity onPress={handleUpdateUserData} className="w-52 bg-[#171717] h-10 rounded-lg shadow-md shadow-gray-800 items-center justify-center mt-4">
                <Text className="text-white">Actualizar</Text>
            </TouchableOpacity>
        )
        }





    </SafeAreaView>
  )
}

export default SetupUser