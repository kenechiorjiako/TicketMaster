import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import CenteredAppBar from '../components/CenteredAppBar';
import GenericAppBar from '../components/GenericAppBar';
import {Font} from '../styles/Theme';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    height: '28%',
  },
  ImageBackground: {
    flex: 1,
  },
  dimmer: {
    backgroundColor: '#000',
    opacity: 0.3,
    flex: 1,
  },
  descriptionText: {
    fontFamily: Font.medium,
    fontSize: 16,
    marginTop: 32,
    color: '#fff',
  },
  underDimmer: {
    position: 'absolute',
    bottom: -0,
  },
  loginSection: {
    backgroundColor: '#fff',
    borderRadius: 24,
    flex: 1,
  },
});

const AuthScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.ImageBackground}
          source={require('../assets/images/background.jpeg')}>
          <View style={styles.dimmer} />
          <Image
            style={styles.underDimmer}
            source={require('../assets/images/under_dimmer.png')}
          />

          <View
            style={{
              position: 'absolute',
              width: '100%',
            }}>
            <SafeAreaView style={{alignItems: 'center'}}>
              <CenteredAppBar onBackPress={() => {}} title="Sign In" />

              <Text style={styles.descriptionText}>
                Welcome back to NinetyMinutesPlus!
              </Text>
            </SafeAreaView>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.loginSection}></View>
    </View>
  );
};

export default AuthScreen;
