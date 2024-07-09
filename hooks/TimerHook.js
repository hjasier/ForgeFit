// TimerContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext(null);

export const TimerProvider = ({ children }) => {
  const [initialTime, setInitialTime] = useState(90);
  const [seconds, setSeconds] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(interval);
            setIsActive(false);
            setSeconds(initialTime);
            return 0;
          }
        });
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setSeconds(initialTime);
    setIsActive(true);
  };

  const format = () => {
    const getSeconds = `${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `${minutes % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  const value = {
    seconds,
    isActive,
    initialTime,
    setInitialTime,
    toggle,
    reset,
    format : format(),
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
