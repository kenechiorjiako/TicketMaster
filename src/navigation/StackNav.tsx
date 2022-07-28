import * as React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const StackNav = () => {
    return (
      <Stack.Navigator initialRouteName="Splash" screenOptions={{
        headerShown: false
      }}> 
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    );
}

export default StackNav