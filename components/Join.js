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
import BackButton from './BackButton';

export default function Join({navigation}) {
  const [groupId, setGroupId] = React.useState('');

  const globals = React.useContext(context);

  const checkGroupId = () => {
    fetch('http://localhost:3001/tigerhacks/canJoinGroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupId: groupId,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          globals.setGroup(group => ({...group, id: groupId}));
          navigation.navigate('User');
        } else {
          console.log(res.message);
        }
      })
      .catch(err => {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation}/>
      <View style={[styles.ineomorphTop, {marginHorizontal: '25%'}]}>
        <View style={styles.ineomorphBottom}>
          <View style={styles.ineomorphInner}>
            <TextInput
              style={styles.text}
              placeholder="Group Code"
              placeholderTextColor="white"
              color="white"
              onChangeText={t => setGroupId(t)}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={[styles.neomorphTop, {marginHorizontal: '25%'}]}>
        <TouchableOpacity style={styles.neomorphBottom}>
          <TouchableOpacity style={styles.blueNeomorphInner}>
            <Button title="Create Group" onPress={checkGroupId} color="white" />
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
