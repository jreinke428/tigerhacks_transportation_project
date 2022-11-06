import React from "react";
const logo = require('../tabs.png');
import { Button, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { context } from "../globals";

export default function Home({ navigation }){
    const globals = React.useContext(context);

    return(
        <SafeAreaView style={styles.container}>
            <Image source={logo}></Image>
            <TouchableOpacity style={[styles.neomorphTop, styles.horizontal]}>
                <TouchableOpacity style={styles.neomorphBottom}>
                    <TouchableOpacity style={styles.neomorphInner}>
                        <Button onPress={() => navigation.navigate('Group')} title='Create Group          ' color='#FFFFFF'/>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.neomorphTop, styles.horizontal]}>
                <TouchableOpacity style={styles.neomorphBottom}>
                    <TouchableOpacity style={styles.neomorphInner}>
                        <Button onPress={() => navigation.navigate('Join')} title='Join Group              ' color='#FFFFFF'/>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
            
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#262b2b',
    },
    horizontal: {
        flexDirection: 'row',
        flexGrow: 0,
        justifyContent: 'center',
        alignContent: 'center',
    },
    text: {
        textAlign: "center"
    },
    neomorphInner: {
        backgroundColor: '#262b2b',
        borderWidth: 1,
        borderColor: '#262b2b',
        padding: 10,
        borderRadius: 5
    },
    neomorphTop: {
        borderRadius: 10,
        shadowColor: '#2F3135',
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowOffset: { width: -5, height: -5},
        marginTop: 30
    },
    neomorphBottom: {
        borderRadius: 10,
        shadowColor: '#232427',
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowOffset: { width: 5, height: 5}
    }
})