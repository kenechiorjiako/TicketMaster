import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AppBar from '../components/AppBar';
import SearchBar from '../components/SearchBar';
import {Colors} from '../styles/Theme';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: Colors.background}}>
      <View>
        <AppBar />
        <SearchBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;