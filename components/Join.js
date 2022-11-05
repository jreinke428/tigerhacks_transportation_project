import React from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function Join({ navigation, route}){

    const [groupId, setGroupId] = React.useState('');

    const checkGroupId = () => {
        fetch('http://localhost:3001/tigerhacks/canJoinGroup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                groupId: groupId
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
        })
        .catch(err => {});
    }

    return(
        <SafeAreaView style={styles.container}>
            <TextInput placeholder='Group Code' onChangeText={t => setGroupId(t)}/>
            <TouchableOpacity onPress={checkGroupId}>
                <Text style={styles.text}>Join</Text>
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
    text: {
        textAlign: "center"
    },
})