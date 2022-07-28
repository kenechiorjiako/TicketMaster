import React from "react";
import {StyleSheet, View} from "react-native";
import { Colors } from "../styles/Theme";
import Logo from "../assets/svgs/LogoLarge.svg"


const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.primary,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
const SplashScreen = () => {
    return (
        <View style={styles.screen}>
            <Logo fill={Colors.white}/>
        </View>
    );
}


export default SplashScreen