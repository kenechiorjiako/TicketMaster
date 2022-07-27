/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Colors from './src/styles/Theme';

import AppBar from './src/components/AppBar';

const App = () => {

  const backgroundStyle = {
    backgroundColor: Colors.white,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <AppBar/> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  }
});

export default App;
