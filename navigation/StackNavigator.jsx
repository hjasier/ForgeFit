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
import ExList from '../screens/ExList';
import EditEx from '../screens/EditEx';
import ConfigRoutines from '../screens/ConfigRoutines';
import SelectRoutineEjs from '../screens/SelectRoutineEjs';
import CreateRoutine from '../screens/CreateRoutine';
import ExHistoryList from '../screens/ExHistoryList';
import ExAdd from '../screens/ExAdd';
import ExHistory from '../screens/ExHistory';
import SetWeight from '../screens/SetWeight';
import SetupUser from '../screens/SetupUser';
import ConfigWeek from '../screens/ConfigWeek';
import Connections from '../screens/Connections';
import NewGroup from '../screens/NewGroup';
import SelectGroupEjs from '../screens/SelectGroupEjs';
import ConfigTimer from '../screens/ConfigTimer';
import InfoScreen1 from '../screens/InfoScreen1';
import InfoScreen2 from '../screens/InfoScreen2';
import InfoScreen3 from '../screens/InfoScreen3';



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
        <Stack.Screen name="ExList" component={ExList} options={{headerShown:false}} />
        <Stack.Screen name="EditEx" component={EditEx} options={{headerShown:false}} />
        <Stack.Screen name="ConfigRoutines" component={ConfigRoutines} options={{headerShown:false}} />
        <Stack.Screen name="SelectRoutineEjs" component={SelectRoutineEjs} options={{headerShown:false}} />
        <Stack.Screen name="CreateRoutine" component={CreateRoutine} options={{headerShown:false}} />
        <Stack.Screen name="ExHistoryList" component={ExHistoryList} options={{headerShown:false}} />
        <Stack.Screen name="ExAdd" component={ExAdd} options={{headerShown:false}} />
        <Stack.Screen name="ExHistory" component={ExHistory} options={{headerShown:false}} />
        <Stack.Screen name="SetWeight" component={SetWeight} options={{headerShown:false}} />
        <Stack.Screen name="SetupUser" component={SetupUser} options={{headerShown:false}} />
        <Stack.Screen name="ConfigWeek" component={ConfigWeek} options={{headerShown:false}} />
        <Stack.Screen name="Connections" component={Connections} options={{headerShown:false}} />
        <Stack.Screen name="NewGroup" component={NewGroup} options={{headerShown:false}} />
        <Stack.Screen name="SelectGroupEjs" component={SelectGroupEjs} options={{headerShown:false}} />
        <Stack.Screen name="ConfigTimer" component={ConfigTimer} options={{headerShown:false}} />
        <Stack.Screen name="InfoScreen1" component={InfoScreen1} options={{headerShown:false}} />
        <Stack.Screen name="InfoScreen2" component={InfoScreen2} options={{headerShown:false}} />
        <Stack.Screen name="InfoScreen3" component={InfoScreen3} options={{headerShown:false}} />


        





        









        













       
        

    </Stack.Navigator>
  )
}

export default StackNavigator