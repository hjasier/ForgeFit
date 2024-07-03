import { View, Text } from 'react-native'
import TabNavigator from './TabNavigator'
import { createStackNavigator } from '@react-navigation/stack';
import SearchAlim from '../screens/SearchAlim';
import AlimSum from '../screens/AlimSum';
import AlimAdd from '../screens/AlimAdd';
import Scanner from '../screens/Scanner';
import TakeImg from '../screens/TakeImg';

import MacrosInfo from '../screens/MacrosInfo';
import ConfigMenu from '../screens/ConfigMenu';
import SaveEjDone from '../screens/SaveEjDone';



const Stack = createStackNavigator();

const StackNavigator = () => {

  //const {user} = useAuth();
  const {user} = true;


  return (
    <Stack.Navigator>
      
        <Stack.Screen name="Main" component={TabNavigator}/>
        <Stack.Screen name="SearchAlim" component={SearchAlim} options={{headerShown:false}} />
        <Stack.Screen name="AlimAdd" component={AlimAdd} options={{headerShown:false}} />
        <Stack.Screen name="AlimSum" component={AlimSum} options={{headerShown:false}} />
        <Stack.Screen name="Scanner" component={Scanner} options={{headerShown:false}} />
        <Stack.Screen name="TakeImg" component={TakeImg} options={{headerShown:false}} />
        <Stack.Screen name="MacrosInfo" component={MacrosInfo} options={{headerShown:false}} />
        <Stack.Screen name="ConfigMenu" component={ConfigMenu} options={{headerShown:false}} />
        <Stack.Screen name="SaveEjDone" component={SaveEjDone} options={{headerShown:false}} />







       
        

    </Stack.Navigator>
  )
}

export default StackNavigator