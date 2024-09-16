import { View, Text } from 'react-native'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MacrosMain from '../screens/MacrosMain'


import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed'


import SearchAlim from '../screens/SearchAlim';
import SQTest from '../screens/SQTest';
import OFFTest from '../screens/OFFTest';

import MacrosInfo from '../screens/MacrosInfo';
import UserStatsMenu from '../screens/UserStatsMenu';
import ExMain from '../screens/ExMain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from 'lottie-react-native'
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


// ------------------------------------------------------------------

const Tab = createBottomTabNavigator()

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// ------------------------------------------------------------------



const TabNavigator = () => {
  const navigation = useNavigation();
  const [initialRouteName, setInitialRouteName] = useState('Macros'); 
  const [isLoading, setIsLoading] = useState(true); 

  // Obtener el último tab seleccionado de AsyncStorage
  useEffect(() => {
    const getLastTab = async () => {
      try {
        const lastTab = await AsyncStorage.getItem('lastTab');
        if (lastTab) {
          setInitialRouteName(lastTab); // Si hay un tab guardado, lo usamos
        }
        else {
          navigation.navigate("InfoScreen1");
        }
      } catch (e) {
        console.log(e); // Manejo de errores
      } finally {
        setIsLoading(false); // Una vez que hemos terminado, quitamos el loader
      }
    };
    getLastTab();
  }, []);

  // Esconder el header
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Si está cargando, mostrar un loader
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  // Update lastTab cuando cambie
  const saveLastTab = async (routeName) => {
    try {
      await AsyncStorage.setItem('lastTab', routeName);
    } catch (e) {
      console.log('Error al guardar lastTab:', e);
    }
  };


  const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }) => {
    const { bottom } = useSafeAreaInsets();

    const reducer = (state, action) => {
      return [...state, { x: action.x, index: action.index }];
    }
  
    const [layout, dispatch] = useReducer(reducer, []);
    console.log(layout);
  
    const handleLayout = (event, index) => {
      console.log(index);
      dispatch({ x: event.nativeEvent.layout.x, index });
    }
  
    // Animaciones ------------------------------------------------------
  
    const xOffset = useDerivedValue(() => {
      if (layout.length !== routes.length) return 0;
      return [...layout].find(({ index }) => index === activeIndex).x + 7.5;
    }, [activeIndex, layout]);
  
    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
      };
    });
  
    return (
      <View style={[styles.tabBar, { paddingBottom: bottom }]}>
        <AnimatedSvg
          width={110}
          height={60}
          viewBox="0 0 110 60"
          style={[styles.activeBackground, animatedStyles]}
        >
          <Path
            fill="rgba(255, 255, 255, 1)"
            d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
          />
        </AnimatedSvg>
  
        <View style={styles.tabBarContainer}>
          {routes.map((route, index) => {
            const active = index === activeIndex;
            const { options } = descriptors[route.key];
  
            return (
              <TabBarComponent
                key={route.key}
                active={active}
                options={options}
                onLayout={(e) => handleLayout(e, index)}
                onPress={() => navigation.navigate(route.name)}
              />
            );
          })}
        </View>
      </View>
    );
  };






  const TabBarComponent = ({ active, options, onLayout, onPress }) => {
    const ref = useRef(null);
  
    useEffect(() => {
      if (active && ref.current) {
        ref.current.play();
      }
    }, [active]);
  
    const animatedComponentCircleStyles = useAnimatedStyle(() => {
      return {
        transform: [{ scale: withTiming(active ? 1 : 0, { duration: 250 }) }],
      };
    });
  
    const animatedIconContainerStyles = useAnimatedStyle(() => {
      return {
        opacity: withTiming(active ? 1 : 0.5, { duration: 250 }),
      };
    });
  
    return (
      <TouchableOpacity onPress={onPress} onLayout={onLayout} style={styles.component}>
        <Animated.View style={[styles.componentCircle, animatedComponentCircleStyles]}>
          <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
            <Text>AA</Text>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  
  
  

  

  return (
    <Tab.Navigator 
    tabBar={(props) => <AnimatedTabBar {...props} />}
    
    // initialRouteName={initialRouteName}
    // screenListeners={{
    //   state: (e) => {
    //     const route = e.data.state.routes[e.data.state.index].name;
    //     saveLastTab(route);
    //   },
    // }}
    // screenOptions={({route}) => ({
    //   tabBarActiveTintColor: '#36BFF9',
    //   tabBarInactiveTintColor: 'gray',
    //   tabBarShowLabel: false,
    //   tabBarIcon: ({focused , color , size }) => {

    //     if (route.name === 'Macros') {
    //       return <Icon name="food" type="material-community" color={focused ? "#36BFF9":"gray"} />
    //     } 
    //     else if (route.name === 'UserStats') {
    //       return <Icon name="stats-chart" type="ionicon" color={focused ? "#36BFF9":"gray"} />
    //     }
    //     else if (route.name === 'ExMain') {
    //       return <Icon name="dumbbell" type="font-awesome-5" color={focused ? "#36BFF9":"gray"} />
    //     }
    //   }

    // })}
    >

      <Tab.Screen name="Macros" component={MacrosMain} options={{headerShown:false}}/>
      <Tab.Screen name="UserStats" component={UserStatsMenu} options={{headerShown:false}} />
      <Tab.Screen name="ExMain" component={ExMain} options={{headerShown:false}}/>
      


    </Tab.Navigator>
  )
}


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#36BFF9',
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 36,
    width: 36,
  }
})

export default TabNavigator