import {
  StyleSheet,
  SafeAreaView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import MapView, {Marker, Polygon} from 'react-native-maps';
import React from 'react';
import {context} from '../globals';

export default function AreaMap({navigation}) {
  const [markersCoords, setMarkersCoords] = React.useState([]);

  const globals = React.useContext(context);

  React.useEffect(() => {
    setMarkersCoords(globals.group.area);
  }, []);

  const handleMapPress = e => {
    const coords = e.nativeEvent.coordinate;
    setMarkersCoords(prev => [...prev, coords]);
  };

  const handleMarkerDrag = (e, index) => {
    const coords = e.nativeEvent.coordinate;
    setMarkersCoords(prev => prev.map((e, i) => (i == index ? coords : e)));
  };

  const checkForPolygon = () => {
    if (markersCoords.length < 2) return null;
    return (
      <Polygon
        coordinates={markersCoords}
        fillColor="rgba(220,115,255,0.3)"
        strokeColor="rgba(230,115,255,0.8)"
      />
    );
  };

  const handleFinish = () => {
    globals.setGroup(group => ({...group, area: markersCoords}));
    navigation.navigate('Group');
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        userInterfaceStyle="dark"
        style={styles.map}
        showsUserLocation
        followsUserLocation
        onPress={handleMapPress}>
        {markersCoords.map((coords, i) => (
          <Marker
            draggable
            key={i}
            coordinate={coords}
            onDrag={e => handleMarkerDrag(e, i)}
          />
        ))}
        {checkForPolygon()}
      </MapView>
      <TouchableOpacity
        style={[styles.overlay, styles.blueButton]}
        onPress={handleFinish}>
        <Text style={styles.text}>Finish</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  map: {
    top: -13,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height+1,
  },
  overlay: {
    position: 'absolute',
    bottom: 100,
    left: Dimensions.get('window').width / 2.84,
  },
  blueButton: {
    backgroundColor: '#243fc7',
    borderWidth: 1,
    borderColor: '#262b2b',
    padding: 15,
    width: '30%',
    borderRadius: 5,
  },
});
