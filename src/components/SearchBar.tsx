import React from 'react';
import {StyleSheet, TextInput, View, Text, Button, Image, TouchableOpacity} from 'react-native';
import {Colors, Font, Shadows, Sizes} from '../styles/Theme';
import LinearGradient from 'react-native-linear-gradient';
import SearchIcon from '../assets/svgs/searchIcon.svg';

const SearchButton = () => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
    </TouchableOpacity>
  );
};

const SearchBar = () => {
  return (
    <LinearGradient
      start={{x: 0.0, y: 0}}
      end={{x: 1, y: 0}}
      locations={[0, 0.7, 1]}
      colors={[
        'rgba(245, 245, 245, 1)',
        'rgba(239, 239, 239, 0.3)',
        'rgba(255, 255, 255, 0)',
      ]}
      style={styles.searchBar}>
      <SearchIcon width={20} height={20} fill={Colors.primary} />
      <TextInput style={styles.textInput} placeholder="Search events" />
      <SearchButton />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: Sizes.sideBorder,
    marginTop: 20,
    paddingStart: 16,
    paddingVertical: 4,
    borderRadius: 300,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  buttonText: {
    fontFamily: Font.semiBold,
    fontSize: 14,
    color: Colors.white,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginEnd: 12,
    flexShrink: 0,
  },
  textInput: {
    margin: 12,
    fontFamily: Font.regular,
    flexGrow: 1,
    flexShrink: 1,
  },
  button: {
    marginEnd: 4,
    borderRadius: 300,
    backgroundColor: Colors.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    flexShrink: 0,
    ...Shadows.searchButton
  },
});

export default SearchBar;
