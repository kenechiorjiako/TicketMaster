import * as React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from '../screens/SearchScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';

export type StackParamList = {
  Splash: undefined;
  Home: undefined;
  Search: {query: string};
  EventDetails: {id: string};
};

const Stack = createStackNavigator<StackParamList>();

const StackNav = () => {
    return (
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
        />
        <Stack.Screen
          name="EventDetails"
          component={EventDetailsScreen}
        />
      </Stack.Navigator>
    );
}

export default StackNav