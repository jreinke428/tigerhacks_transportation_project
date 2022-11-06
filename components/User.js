import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import {context} from '../globals';

export default function User({navigation}) {
  const [name, setName] = React.useState('');

  const globals = React.useContext(context);

  const userJoin = () => {
    fetch('http://localhost:3001/tigerhacks/userJoinGroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupId: globals.group.id,
        name: name,
      }),
    })
      .then(res => res.json())
      .then(res => {
        globals.setUser({name, id: res.user._id});
        globals.setGroup({
          name: res.group.name,
          id: res.group._id,
          area: res.group.area,
        });
        new Promise(resolve => setTimeout(resolve, 200)).then(() => {
          globals.startLocation(
            {name, id: res.user._id},
            {name: res.group.name, id: res.group._id, area: res.group.area},
          );
          navigation.navigate('Menu');
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.ineomorphTop, {marginHorizontal: '25%'}]}>
        <View style={styles.ineomorphBottom}>
          <View style={styles.ineomorphInner}>
            <TextInput
              style={styles.text}
              placeholder="Name"
              placeholderTextColor="white"
              color="white"
              onChangeText={t => setName(t)}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={[styles.neomorphTop, {marginHorizontal: '25%'}]}>
        <TouchableOpacity style={styles.neomorphBottom}>
          <TouchableOpacity style={styles.blueNeomorphInner}>
            <Button title="Join" onPress={userJoin} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#262b2b',
  },
  horizontal: {
    flexDirection: 'row',
    flexGrow: 0,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  neomorphInner: {
    backgroundColor: '#262b2b',
    borderWidth: 1,
    borderColor: '#262b2b',
    padding: 10,
    borderRadius: 5,
  },
  blueNeomorphInner: {
    backgroundColor: '#243fc7',
    borderWidth: 1,
    borderColor: '#262b2b',
    padding: 10,
    borderRadius: 5,
  },
  neomorphTop: {
    borderRadius: 10,
    shadowColor: '#2F3135',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: {width: -5, height: -5},
    marginTop: 30,
  },
  neomorphBottom: {
    borderRadius: 10,
    shadowColor: '#232427',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: {width: 5, height: 5},
  },
  ineomorphInner: {
    backgroundColor: '#232427',
    borderWidth: 1,
    borderColor: '#262b2b',
    padding: 10,
    borderRadius: 5,
  },
  ineomorphTop: {
    borderRadius: 10,
    shadowColor: '#2F3135',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: {width: -1, height: -1},
    marginTop: 30,
  },
  ineomorphBottom: {
    borderRadius: 10,
    shadowColor: '#232427',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: {width: 1, height: 1},
  },
});
