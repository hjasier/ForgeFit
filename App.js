import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/MacrosMain';
import ChartTest from './components/PerChart';
import StackNavigator from './navigation/StackNavigator';
import { DatabaseProvider } from './hooks/DatabaseContext';


const Stack = createNativeStackNavigator();



function App() {
  return (
    <DatabaseProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </DatabaseProvider>
  );
}

export default App;