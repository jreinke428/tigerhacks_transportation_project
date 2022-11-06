import React from 'react';
import {SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import MapView, {Polygon} from 'react-native-maps';
import globals from '../globals';

export default function MenuMap({navigation}) {
  const ref = React.useRef();
  const globals = React.useContext(globals);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        userInterfaceStyle="dark"
        style={styles.map}
        showsUserLocation
        followsUserLocation
        ref={ref}
        onMapReady={() =>
          ref.current.fitToCoordinates(globals.group.area, {
            edgePadding: {top: 20, right: 20, bottom: 20, left: 20},
            animated: false,
          })
        }>
        <Polygon
          coordinates={globals.group.area}
          fillColor="rgba(220,115,255,0.3)"
          strokeColor="rgba(230,115,255,0.8)"
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
