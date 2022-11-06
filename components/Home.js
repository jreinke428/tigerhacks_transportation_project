import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Home({ navigation }){

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Tabs</Text>
            <View style={styles.horizontal}>
                <View style={styles.neomorphTop}>
                    <View style={styles.neomorphBottom}>
                        <View style={styles.neomorphInner}>
                            <Text>Hello</Text> 
                        </View>
                    </View>
                </View>
            </View>
            <Button onPress={() => navigation.navigate('Group')} title='Create Group' />
            <Button onPress={() => navigation.navigate('Join')} title='Join Group' />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#3d3d3d',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    text: {
        textAlign: "center"
    },
    neomorphInner: {
        backgroundColor: '#0000',
        borderWidth: 1,
        borderColor: '#3d3d3d',
        padding: 10
    },
    neomorphTop: {
        borderRadius: 10,
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: 1,
        shadowOffset: { width: -5, height: -5}
    },
    neomorphBottom: {

    }
})