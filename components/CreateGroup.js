import React from 'react';
import { Text, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';
import context from '../globals';

export default function CreateGroup({ navigation }){

    const [name, setName] = React.useState('');
    const [area, setArea] = React.useState([]);

    const globals = React.useContext(context);

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
            globals.setGroup({ name, area, id: res.groupId });
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