import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';

export default function MenuNavBar({navigation, route}) {
  return (
    <SafeAreaView style={styles.navBar}>
      <TouchableOpacity style={[styles.neomorphTop]}>
        <TouchableOpacity style={styles.neomorphBottom}>
          <TouchableOpacity
            style={styles.neomorphInner}
            onPress={() => navigation.navigate('Users')}>
            <Icon type="ionicon" name="people-outline" raised reverse />
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.neomorphTop]}>
        <TouchableOpacity style={styles.neomorphBottom}>
          <TouchableOpacity
            style={styles.neomorphInner}
            onPress={() => navigation.navigate('MenuMap')}>
            <Icon type="ionicon" name="map-outline" raised reverse />
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.neomorphTop]}>
        <TouchableOpacity style={styles.neomorphBottom}>
          <TouchableOpacity
            style={styles.neomorphInner}
            onPress={() => navigation.navigate('Share')}>
            <Icon type="ionicon" name="share-outline" raised reverse />
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: Dimensions.get('screen').height / 10,
    backgroundColor: '#262b2b',
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
});
