import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/MacrosMain';
import ChartTest from './components/PerChart';
import StackNavigator from './navigation/StackNavigator';
import { DatabaseProvider } from './hooks/DatabaseContext';
import { MenuProvider } from 'react-native-popup-menu';
import { TimerProvider } from './hooks/TimerHook';
import { MacrosProvider } from './hooks/MacrosHook';

const Stack = createNativeStackNavigator();



function App() {
  return (
    <DatabaseProvider>
      <TimerProvider>
          <MenuProvider>
            <NavigationContainer>
              <MacrosProvider>
                <StackNavigator />
              </MacrosProvider>
            </NavigationContainer>
          </MenuProvider>
      </TimerProvider>
    </DatabaseProvider>
  );
}

export default App;