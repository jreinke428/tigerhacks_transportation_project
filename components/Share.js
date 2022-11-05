import { SafeAreaView, StyleSheet, Text } from "react-native";


export default function Share({ navigation, route }){
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Group Code</Text>
            <Text style={styles.text}>{route.params.group.id}</Text>
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
    }
})