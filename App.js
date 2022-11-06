import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { color } from "react-native-elements/dist/helpers";
import BackgroundGeolocation from "react-native-background-geolocation";
import * as Notifications from "expo-notifications";


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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App(){

  React.useEffect(() => {
    BackgroundGeolocation.ready({
      logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
      debug: false,
      stopOnTerminate: false,
      startOnBoot: true
    })

    BackgroundGeolocation.watchPosition((location) => {
      if(!(group.id && user.id)) return
      console.log('location '+user.name);
      fetch('http://localhost:3001/tigerhacks/locationUpdate', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({user: {id: user.id, name: user.name, groupId: group.id, lkLoc: {longitude: location.coords.longitude, latitude: location.coords.latitude}}, area: group.area})
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if(res.notifications.length){
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Notification",
              body: names.join(' ,') + (res.notifications.length > 1 ? ' have' : ' has') + ' left the perimeter.',
              data: { data: 'goes here' },
            },
            trigger: { seconds: 0.1 },
          });
        }
      })
    }, (errorCode) => {
      console.log("error: ", errorCode);
    }, {
      interval: 15000,
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      persist: true,
      timeout: 5000
    });
    return () => BackgroundGeolocation.stopWatchPosition();
  });

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
