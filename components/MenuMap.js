import React from "react";
import { SafeAreaView, StyleSheet, Dimensions } from "react-native";
import MapView, { Polygon } from "react-native-maps";

export default function MenuMap({ navigation, route }){

    const ref = React.useRef();
    
    return(
        <SafeAreaView style={styles.container}>
            <MapView 
                userInterfaceStyle="dark"
                style={styles.map}
                showsUserLocation
                followsUserLocation
                ref={ref}
                onMapReady={() => ref.current.fitToCoordinates(route.params.group.area, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false })}
            >
                <Polygon 
                    coordinates={route.params.group.area}
                    fillColor='rgba(220,115,255,0.3)'
                    strokeColor='rgba(230,115,255,0.8)'
                />
            </MapView>
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
    }
})