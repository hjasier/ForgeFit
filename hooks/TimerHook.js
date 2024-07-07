import { useState, useEffect } from 'react';


const useTimer = () => {
  const [initialTime, setInitialTime] = useState(90);
  const [seconds, setSeconds] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        seconds > 0 && setSeconds(seconds => seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

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
  }
  


  return {
    seconds,
    isActive,
    initialTime,
    setInitialTime,
    toggle,
    reset,
    format : format()
  };
};

export default useTimer;
