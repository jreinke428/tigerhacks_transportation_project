import {SafeAreaView, StyleSheet} from 'react-native';
import context from '../globals';
import MenuNavBar from './MenuNavBar';

export default function Users({navigation}) {
  const globals = React.useContext(context);

  return <SafeAreaView style={styles.container}></SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
