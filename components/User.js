import React from "react";
import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function User({ navigation, route }){

    const [name, setName] = React.useState('');

    const userJoin = () => {
        console.log(route.params);
        fetch('http://localhost:3001/tigerhacks/userJoinGroup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                groupId: route.params.group.id,
                name: name
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            route.params.setUser({ name , id: res.user._id});
            route.params.setGroup({ name: res.group.name, id: res.group._id, area: res.group.area});
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