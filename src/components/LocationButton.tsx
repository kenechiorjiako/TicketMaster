import React from 'react';
import {Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Font} from '../styles/Theme';

export type Props = {
  location: string;
  onPress?: () => void
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingEnd: 13,
    paddingStart: 11,
    backgroundColor: Colors.secondary,
    borderRadius: 300,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    marginEnd: 3,
  },
  text: {
    fontFamily: Font.medium,
    marginStart: 3,
    fontSize: 12,
  },
});

const LocationButton: React.FC<Props> = ({location, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.button} onPress={onPress}>
      <Image
        style={styles.icon}
        source={require('../assets/images/location.png')}
      />
      <Text style={styles.text}>{location}</Text>
    </TouchableOpacity>
  );
};

export default LocationButton;
