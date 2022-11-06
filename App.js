import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BackgroundGeolocation from 'react-native-background-geolocation';
import * as Notifications from 'expo-notifications';
import {context} from './globals';

import Home from './components/Home';
import CreateGroup from './components/CreateGroup';
import AreaMap from './components/AreaMap';
import Join from './components/Join';
import User from './components/User';
import MenuMap from './components/MenuMap';
import Users from './components/Users';
import Share from './components/Share';
import MenuNavBar from './components/MenuNavBar';
import BackButton from './components/BackButton';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state.',
  'Sending `providerchange` with no listeners registered.',
  'Sending `location` with no listeners registered.',
  'Sending `watchposition` with no listeners registered.',
]);

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

export default function App() {
  React.useEffect(() => {
    checkNotifications();
    return () => BackgroundGeolocation.stopWatchPosition();
  }, []);

  const [group, setGroup] = React.useState({name: '', area: [], id: ''});
  const [user, setUser] = React.useState({name: '', id: ''});

  const Menu = () => (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={MenuNavBar}
      initialRouteName="MenuMap">
      <Tab.Screen name="Users" component={Users} />
      <Tab.Screen name="MenuMap" component={MenuMap} />
      <Tab.Screen name="Share" component={Share} />
    </Tab.Navigator>
  );

  return (
    <context.Provider value={{group, setGroup, user, setUser, startLocation}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group screenOptions={{ headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Group" component={CreateGroup} />
            <Stack.Screen name="Area" component={AreaMap} />
            <Stack.Screen name="Join" component={Join} />
            <Stack.Screen name="User" component={User} />
          </Stack.Group>
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{headerBackVisible: false, headerStyle: {backgroundColor: '#262b2b'}, headerTitleStyle: {color: 'white', fontWeight: 'bold'}}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </context.Provider>
  );
}

const checkNotifications = () => {
  Notifications.requestPermissionsAsync();
};

const startLocation = (user, group) => {
  BackgroundGeolocation.ready(
    {
      logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
      debug: false,
      stopOnTerminate: true,
    },
    () => {
      BackgroundGeolocation.watchPosition(
        location => {
          console.log('location sent ', group, user);
          fetch('http://localhost:3001/tigerhacks/locationUpdate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user: {
                id: user.id,
                name: user.name,
                groupId: group.id,
                lkLoc: {
                  longitude: location.coords.longitude,
                  latitude: location.coords.latitude,
                },
              },
              area: group.area,
            }),
          })
            .then(res => res.json())
            .then(res => {
              console.log('res', res);
              if (res.notifications.length) {
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: 'Notification',
                    body:
                      res.notifications.join(' ,') +
                      (res.notifications.length > 1 ? ' have' : ' has') +
                      ' left the perimeter.',
                    data: {data: 'goes here'},
                  },
                  trigger: {seconds: 1},
                });
              }
            });
        },
        errorCode => {
          console.log('error: ', errorCode);
        },
        {
          interval: 10000,
          desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
          timeout: 50000,
        },
      );
    },
  );
};
