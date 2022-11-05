import { SafeAreaView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function User({ navigation, route}){

    const [name, setName] = React.useState('');

    const userJoin = () => {
        fetch('localhost:3001/tigerhacks/userJoinGroup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                groupId: route.params.groupId,
                name: name
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log('Joined');
        })
        .catch(err => {});
    }

    return(
        <SafeAreaView style={styles.container}>
            <TextInput placeholder='Name' onChangeText={t => setName(t)}/>
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