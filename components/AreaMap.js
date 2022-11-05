import { StyleSheet, SafeAreaView, View, Dimensions, Text, TouchableOpacity} from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import React from 'react';

export default function AreaMap({ navigation, route}){

    const [markersCoords, setMarkersCoords] = React.useState([]);

    React.useEffect(() => {
        if(route.params.areaPoints.length) setMarkersCoords(route.params.areaPoints);
    }, []);

    const handleMapPress = (e) => {
        const coords = e.nativeEvent.coordinate;
        setMarkersCoords(prev => [...prev, coords]);
    }

    const handleMarkerDrag = (e, index) => {
        const coords = e.nativeEvent.coordinate;
        setMarkersCoords(prev => prev.map((e, i) => i == index ? coords : e));
    }

    const checkForPolygon = () => {
        if (markersCoords.length < 2) return null;
        return <Polygon 
                coordinates={markersCoords} 
                fillColor='rgba(220,115,255,0.3)'
                strokeColor='rgba(230,115,255,0.8)'
            />
    }

    const handleFinish = () => {
        route.params.setAreaPoints(markersCoords);
        navigation.navigate('Group');
    }

    return(
        <SafeAreaView style={styles.container}>
            <MapView 
                style={styles.map}
                //showsUserLocation
                //followsUserLocation
                onPress={handleMapPress}
            >   
                {markersCoords.map((coords, i) => 
                    <Marker
                        draggable
                        key={i}
                        coordinate={coords}
                        onDrag={(e) => handleMarkerDrag(e, i)}
                    />
                )}
                {checkForPolygon()}
            </MapView>
            <TouchableOpacity style={styles.overlay} onPress={handleFinish}>
                <Text style={styles.text}>Finish</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    overlay: {
        position: 'absolute',
        bottom: 100,
        left: Dimensions.get('window').width/2.2
    }
})