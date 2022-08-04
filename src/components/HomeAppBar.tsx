import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Sizes, Shadows} from '../styles/Theme';
import Logo from '../assets/svgs/Logo.svg';
import LocationButton from './LocationButton';

export type Props = {
  location: string
  onSelectLocation?: () => void;
};

const AppBar: React.FC<Props> = ({location, onSelectLocation}) => {
  const styles = StyleSheet.create({
    appBar: {
      width: '100%',
      height: 64,
      paddingHorizontal: Sizes.sideBorder,
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors.background,
      ...Shadows.light
    },
  });

  return (
    <View style={styles.appBar}>
      <Logo height={150} fill={Colors.primary} />
      <LocationButton location={location} onPress={onSelectLocation}/>
    </View>
  );
};

export default AppBar;
