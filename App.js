import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { color } from "react-native-elements/dist/helpers";

import Home from './components/Home';
import CreateGroup from "./components/CreateGroup";
import AreaMap from "./components/AreaMap";
import Join from "./components/Join";
import User from "./components/User";
import MenuMap from './components/MenuMap';
import Users from './components/Users';
import Share from './components/Share';
import MenuNavBar from "./components/MenuNavBar";

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.']);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const GRAY = '#3d3d3d';

export default function App(){

  const [group, setGroup] = React.useState({name: '', area: [], id: ''});
  const [user, setUser] = React.useState({name: '', id: ''});

  const Menu = () => 
    (<Tab.Navigator screenOptions={{headerShown: false}} tabBar={MenuNavBar} initialRouteName='MenuMap'>
      <Tab.Screen name='Users' component={Users} />
      <Tab.Screen name='MenuMap' component={MenuMap} initialParams={{group}}/>
      <Tab.Screen name='Share' component={Share} initialParams={{group}}/>
    </Tab.Navigator>);

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{ headerStyle: styles.darkShadow}}>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Group' component={CreateGroup} initialParams={{ setGroup }}/>
          <Stack.Screen name='Area' component={AreaMap} />
          <Stack.Screen name='Join' component={Join} />
          <Stack.Screen name='User' component={User} initialParams={{ group, setGroup, setUser }}/>
        </Stack.Group>
        <Stack.Screen name='Menu' component={Menu} options={{headerBackVisible: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  lightShadow: {
    backgroundColor: GRAY,
    borderRadius: 10,
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowOffset: {width: -6, height: -6},
    shadowColor: color(GRAY).lighten(0.5).alpha(0.5)
  },
  darkShadow: {
    backgroundColor: GRAY,
    borderRadius: 10,
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowOffset: {width: 6, height: 6},
    shadowColor: color(GRAY).darken(0.3).alpha(0.5)
  }
})
