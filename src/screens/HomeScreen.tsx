import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AppBar from '../components/AppBar';
import SearchBar from '../components/SearchBar';
import {Colors} from '../styles/Theme';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <AppBar />
        <SearchBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background
  }
});

export default HomeScreen;