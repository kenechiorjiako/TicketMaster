import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Sizes, Shadows, Font} from '../styles/Theme';

export type Props = {
  title: string;
  onBackPress: () => void;
};

const GenericAppBar: React.FC<Props> = ({title, onBackPress}) => {
  const styles = StyleSheet.create({
    appBar: {
      width: '100%',
      height: 64,
      paddingHorizontal: Sizes.sideBorder,
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: Colors.background,
      ...Shadows.light,
    },
    image: {
        width: 20,
        height: 20,
    },
    title: {
        fontFamily: Font.bold,
        fontSize: 18,
        marginStart: 24 
    }
  });

  return (
    <View style={styles.appBar}>
      <TouchableOpacity onPress={() => {onBackPress()}}>
        <Image
          style={styles.image}
          source={require('../assets/images/backButton.png')}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default GenericAppBar;
