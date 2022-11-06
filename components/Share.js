import {SafeAreaView, StyleSheet, Text} from 'react-native';
import globals from '../globals';

export default function Share({navigation}) {
  const globals = React.useContext(globals);

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
