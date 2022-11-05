import { SafeAreaView, StyleSheet } from "react-native";
import MenuNavBar from "./MenuNavBar";

export default function Users({ navigation, route }){
    return(
        <SafeAreaView style={styles.container}>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
})