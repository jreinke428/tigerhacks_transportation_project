import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';

export default function CreateGroup({ navigation, route }){

    const [name, setName] = React.useState('');
    const [area, setArea] = React.useState([]);

    const createGroup = () => {
        fetch('http://localhost:3001/tigerhacks/createGroup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name: name,
                area: area
            })
        })
        .then(res => res.json())
        .then(res => {
            route.params.setGroup({ name, area, id: res._id })
            navigation.navigate('User');
        })
        .catch(err => console.log(err));
    }

    return(
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.text} placeholder='Group Name' onChangeText={t => setName(t)}/>
            <Button title={area.length ? 'Edit Area' : 'Create Area'} onPress={() => navigation.navigate('Area', {area, setArea})}/>
            <Button title='Create Group' onPress={createGroup}/>
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