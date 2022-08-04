import React, { useEffect } from 'react';
import {StyleSheet, TouchableOpacity, View, StatusBar} from 'react-native';
import {Colors} from '../styles/Theme';
import Logo from '../assets/svgs/LogoLarge.svg';
import {useNavigation, StackActions} from '@react-navigation/native';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.primary,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SplashScreen = () => {
  const navigation = useNavigation();

  const navigationEffect = useEffect(() => {
    setTimeout(() => navigation.dispatch(StackActions.replace('Home')), 4000);
  });

  return (
    <View style={styles.screen}>
      <TouchableOpacity>
        <Logo fill={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
