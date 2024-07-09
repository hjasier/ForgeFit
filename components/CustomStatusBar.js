// CustomStatusBar.js
import React from 'react';
import { StatusBar, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


const CustomStatusBar = ({ mode }) => {

  options = {
    white: { backgroundColor: '#F3F3F2', barStyle: 'dark-content' },
    blue: { backgroundColor: '#36BFF9', barStyle: 'dark-content' },
  };


  useFocusEffect(
      useCallback(() => {
        console.log('CustomStatusBar: ',mode);
        StatusBar.setBarStyle(options[mode].barStyle);
        StatusBar.setBackgroundColor(options[mode].backgroundColor);
      }, [mode])
  );
    


  return (
    <StatusBar translucent backgroundColor={options[mode].backgroundColor} barStyle={options[mode].barStyle} />
  );
};

export default CustomStatusBar;
