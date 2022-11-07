import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {context} from '../globals';

export default function Share({navigation}) {
  const globals = React.useContext(context);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.neomorphTop, {marginHorizontal: '25%'}]}>
        <View style={styles.neomorphBottom}>
          <View style={styles.neomorphInner}>
            <Text style={styles.title}>Group Code</Text>
            <View style={[styles.ineomorphTop]}>
              <View style={styles.ineomorphBottom}>
                <View style={styles.ineomorphInner}>
                  <Text style={styles.shareCode}>{globals.group.id}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
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
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    paddingTop: 13,
  },
  shareCode: {
    textAlign: 'center',
    color: 'white',
    fontSize: 45,
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
  neomorphInner: {
    backgroundColor: '#262b2b',
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
    marginBottom: 100,
  },
  neomorphBottom: {
    borderRadius: 10,
    shadowColor: '#232427',
    shadowRadius: 5,
    shadowOpacity: 1,
    shadowOffset: {width: 5, height: 5},
  },
});
