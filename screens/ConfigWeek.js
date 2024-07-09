import { View, Text } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import SelectorRutina from '../components/SelectorRutina';
import { useDatabase } from '../hooks/DatabaseContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ConfigWeek = () => {
    const db = useDatabase();

    const [selectedDay, setSelectedDay] = useState(null);
    const [rutina, setRutina] = useState(null);
    const [days, setDays] = useState([]);

    const getDays = async () => {
        try {
            const query = 'SELECT * FROM week';
            const result = await db.getAllAsync(query);
            setDays(result);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectDay = async (day) => {
        if (!day || day.id === undefined) {
            return;
        }
        setSelectedDay(day.id);
        if (!day.routine_id) {
            setRutina(null);
            return;
        }
        try {
            const routine = await db.getAllAsync(`SELECT * FROM routines WHERE id = ${day.routine_id}`);
            setRutina(routine[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDays();
    }, []);

    const updateDay = useCallback(async () => {
        if (selectedDay === null) {
            return;
        }
        const query = 'UPDATE week SET routine_id = ? WHERE id = ?';
        const values = [rutina ? rutina.id : null, selectedDay];
        try {
            await db.runAsync(query, values);
            getDays();
        } catch (error) {
            console.log(error);
        }
    }, [selectedDay, rutina]);

    useEffect(() => {
        updateDay();
    }, [rutina]);

    return (
        <View className="py-20">
            <View className="flex-row space-x-2 items-center justify-center">
                {days.map((day) => {
                    return (
                        <TouchableOpacity
                            key={day.id}
                            style={{ backgroundColor: selectedDay === day.id ? '#FFD700' : '#EAEAEA' }}
                            className="w-10 h-10 rounded-xl items-center justify-center"
                            onPress={() => handleSelectDay(day)}
                        >
                            <Text>{day.letter}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View className="items-center mt-20">
                <SelectorRutina unselect={true} rutina={rutina} setRutina={setRutina} />
            </View>
        </View>
    );
};

export default ConfigWeek;
