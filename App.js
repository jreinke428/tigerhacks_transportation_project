import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from "react-native";

import Home from './components/Home';
import CreateGroup from "./components/CreateGroup";
import AreaMap from "./components/AreaMap";
import Join from "./components/Join";
import User from "./components/User";

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state.']);

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Group' component={CreateGroup} />
          <Stack.Screen name='Area' component={AreaMap} />
          <Stack.Screen name='Join' component={Join} />
          <Stack.Screen name='User' component={User} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
