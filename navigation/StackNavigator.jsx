import { View, Text } from 'react-native'
import TabNavigator from './TabNavigator'
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const StackNavigator = () => {

  //const {user} = useAuth();
  const {user} = true;


  return (
    <Stack.Navigator>
      
        <Stack.Screen name="Main" component={TabNavigator}/>

    </Stack.Navigator>
  )
}

export default StackNavigator