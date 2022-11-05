import React from 'react';
import { Text, StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';

export default function CreateGroup({ navigation }){

    const [areaPoints, setAreaPoints] = React.useState([]);
    const [name, setName] = React.useState('');

    const createGroup = () => {
        fetch('http://localhost:3001/tigerhacks/createGroup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name: name,
                area: areaPoints
            })
        })
        .then(res => res.json())
        .then(res => {
            navigation.navigate('User', {groupId: res.groupId});
        })
        .catch(err => console.log(err));
    }

    return(
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.text} placeholder='Group Name' onChangeText={t => setName(t)}/>
            <Button title={areaPoints.length ? 'Edit Area' : 'Create Area'} onPress={() => navigation.navigate('Area', {setAreaPoints: setAreaPoints, areaPoints: areaPoints})}/>
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