// TimerContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const [initialTime, setInitialTime] = useState(90);
  const [seconds, setSeconds] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [resetTime, setResetTime] = useState(null);

  const loadTimerDuration = async () => {
    try {
      const savedDuration = await AsyncStorage.getItem('timerDuration');
      if (savedDuration) {
        setInitialTime(savedDuration);
      }
      else{
        await AsyncStorage.setItem('timerDuration',90);
      }
    } catch (error) {
      console.error('Error loading timer duration:', error);
    }
  };


  useEffect(() => {
    loadTimerDuration();
  }, []);

  
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const elapsedTime = Math.floor((now - resetTime) / 1000);
        const newSeconds = initialTime - elapsedTime;

        if (newSeconds > 0) {
          setSeconds(newSeconds);
        } else {
          clearInterval(interval);
          setIsActive(false);
          setSeconds(0);
          vibrateDevice();
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, resetTime, initialTime]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    const now = new Date().getTime();
    setResetTime(now);
    setSeconds(initialTime);
    setIsActive(true);
    loadTimerDuration();
  };


  const format = () => {
    const getSeconds = `${seconds % 60}`.padStart(2, '0');
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `${minutes % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };


  const vibrateMultiple = (times, pattern) => {
    Vibration.vibrate(pattern);
  
    if (times > 1) {
      setTimeout(() => {
        vibrateMultiple(times - 1, pattern);
      }, pattern.reduce((acc, val) => acc + val, 0)); // Suma de todo el patrón para determinar el tiempo total de espera
    }
  };

  const vibrateDevice = () => {
    const pattern = [500, 500, 500]; // Vibra por 500ms, descansa 500ms, y repite dos veces
    vibrateMultiple(3, pattern);
  };
  

  const value = {
    seconds,
    isActive,
    initialTime,
    setInitialTime,
    toggle,
    reset,
    format: format(),
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  return useContext(TimerContext);
};
