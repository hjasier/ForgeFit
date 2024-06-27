import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/MacrosMain';
import ChartTest from './components/PerChart';
import StackNavigator from './navigation/StackNavigator';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;