import React from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import globals from "../globals";

export default function User({ navigation }){

    const [name, setName] = React.useState('');

    const globals = React.useContext(globals);

    const userJoin = () => {
        fetch('http://localhost:3001/tigerhacks/userJoinGroup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                groupId: globals.group.id,
                name: name
            })
        })
        .then(res => res.json())
        .then(res => {
            globals.setUser({ name , id: res.user._id});
            globals.params.setGroup({ name: res.group.name, id: res.group._id, area: res.group.area});
            navigation.navigate('Menu');
        })
        .catch(err => console.log(err));
    }

    return(
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.text} placeholder='Name' onChangeText={t => setName(t)}/>
            <TouchableOpacity onPress={userJoin}>
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