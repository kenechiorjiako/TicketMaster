import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Font, Shadows, Sizes } from "../styles/Theme";

export type CenteredAppBarProps = {
    title: string;
    onBackPress: () => void;
}

const styles = StyleSheet.create({
  appBar: {
    width: '100%',
    height: 64,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...Shadows.light,
  },
  image: {
    marginStart: Sizes.marginLarge
  },
  title: {
    fontFamily: Font.bold,
    fontSize: 24,
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    color: '#fff'
  },
});

const CenteredAppBar: React.FC<CenteredAppBarProps> = ({title, onBackPress}) => {
  return (
    <View style={styles.appBar}>
      <TouchableOpacity
        onPress={() => {
          onBackPress();
        }}>
        <Image
          style={styles.image}
          source={require('../assets/images/back_button.png')}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default CenteredAppBar;