import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../styles/Theme';
import Svg, {SvgXml} from 'react-native-svg';
import Logo from './assets/LogoWhite.svg';

const AppBar = () => {
  const styles = StyleSheet.create({
    appBar: {
      width: '100%',
      height: 64,
      paddingStart: 10,
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors.primary,
    },
  });

  return (
    <View style={styles.appBar}>
      <Logo width={120} height={40} fill={'any color'} />
    </View>
  );
};

export default AppBar;
