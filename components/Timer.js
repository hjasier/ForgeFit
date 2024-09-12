import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTimer } from '../hooks/TimerHook';

const Timer = () => {

  const timer = useTimer();

  return (
    <TouchableOpacity onPress={timer.reset}>
        <Text className="w-15 font-extrabold text-xl text-white">{timer.format}</Text>
    </TouchableOpacity>
  )
}

export default Timer