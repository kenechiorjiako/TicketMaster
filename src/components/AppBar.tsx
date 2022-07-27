import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../styles/Theme';
import Svg, {SvgXml} from 'react-native-svg';
import SvgImage from '.src/assets/svgs/LogoWhite.svg';

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

  return <View style={styles.appBar}> <SvgImage></SvgImage></View>;
};

export default AppBar;
