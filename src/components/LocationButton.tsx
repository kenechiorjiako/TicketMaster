import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Font, Shadows} from '../styles/Theme';

export type Props = {
  location: string;
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
    width: 20,
    height: 20,
    marginEnd: 3,
  },
  text: {
    fontFamily: Font.medium,
    marginStart: 3,
    fontSize: 13.5,
  },
});

const LocationButton: React.FC<Props> = ({location}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.button}>
      <Image
        style={styles.icon}
        source={require('../assets/images/location.png')}
      />
      <Text style={styles.text}>{location}</Text>
    </TouchableOpacity>
  );
};

export default LocationButton;
