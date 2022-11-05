import { SafeAreaView, Dimensions, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"

export default function MenuNavBar({ navigation, route }){
    return(
        <SafeAreaView style={styles.navBar}>
                <Icon type='ionicon' name='people-outline' raised reverse onPress={() => navigation.navigate('Users')}/>
                <Icon type='ionicon' name='map-outline' raised reverse onPress={() => navigation.navigate('MenuMap')}/>
                <Icon type='ionicon' name='share-outline' raised reverse onPress={() => navigation.navigate('Share')}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    navBar: {
        position: 'absolute',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        bottom: 0,
        left: 0,
        right: 0,
        minHeight: Dimensions.get('screen').height/10,
        backgroundColor: 'rgb(255,255,255)'
    },
    text: {
        textAlign: 'center'
    }
})