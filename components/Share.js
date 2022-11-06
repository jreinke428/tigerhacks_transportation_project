import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import { context } from '../globals';

export default function Share({navigation}) {
  const globals = React.useContext(context);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Group Code</Text>
      <Text style={styles.text}>{globals.group.id}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
