import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-elements"


export default function BackButton({ navigation, route }){

    return(
        <TouchableOpacity style={styles.neomorphTop}>
            <TouchableOpacity style={styles.neomorphBottom}>
                <TouchableOpacity style={styles.neomorphInner} onPress={() => navigation.goBack()}>
                    <Icon style={styles.text} type='ionicon' name='arrow-back-outline' color='#FFF' size={16}/>
                </TouchableOpacity>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    neomorphInner: {
        backgroundColor: '#262b2b',
        borderWidth: 1,
        borderColor: '#262b2b',
        padding: 10,
        borderRadius: 20
    },
    neomorphTop: {
        position: 'absolute',
        top: 70,
        left: 20,
        borderRadius: 10,
        shadowColor: '#2F3135',
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowOffset: { width: -5, height: -5},
        zIndex: 999,
        elevation: 30
    },
    neomorphBottom: {
        borderRadius: 10,
        shadowColor: '#232427',
        shadowRadius: 5,
        shadowOpacity: 1,
        shadowOffset: { width: 5, height: 5}
    },
    text: {
        color: '#FFF'
    }
})
