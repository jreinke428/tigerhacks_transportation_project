import React from "react";
import { Button, SafeAreaView, StyleSheet, Text } from "react-native";
import Morph from "./Morph";

export default function Home({ navigation }){

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Tabs</Text>
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
    text: {
        textAlign: "center"
    },
})