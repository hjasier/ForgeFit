import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/MacrosMain';
import ChartTest from './components/PerChart';
import StackNavigator from './navigation/StackNavigator';
import { DatabaseProvider } from './hooks/DatabaseContext';
import { MenuProvider } from 'react-native-popup-menu';

const Stack = createNativeStackNavigator();



function App() {
  return (
    <DatabaseProvider>
      <MenuProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </MenuProvider>
    </DatabaseProvider>
  );
}

export default App;