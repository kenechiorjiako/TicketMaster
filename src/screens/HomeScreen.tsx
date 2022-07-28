import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, Text, useWindowDimensions, View, Button} from 'react-native';
import AppBar from '../components/AppBar';
import SearchBar from '../components/SearchBar';
import SmallEventItem from '../components/eventItems/SmallEventItem';
import {Colors, Font, Sizes} from '../styles/Theme';
import Spacer from '../components/Spacer';
import LargeEventItem from '../components/eventItems/LargeEventItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const [showLocationSelector, setShowLocationSelector] = useState(true);
  const itemProperty = {
      imageSource: '../assets/images/eventImage.jpeg',
      eventName: 'Philadelphia nuggets vs. Atlanta Hawks',
      date: {
        day: 'Sat',
        month: 'Jul 4',
        time: '8:30 pm',
      },
      location: {
        city: 'Citizens bank park',
        venue: 'Flushing, NY',
      }
  };

  const {width, height} = useWindowDimensions();

  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <AppBar />

        <Spacer height={Sizes.marginLarge} />

        <View style={styles.body}>
          <SearchBar />

          <Spacer height={44} color="transparent" />

          <Text style={styles.headings}>Featured Events</Text>

          <Spacer height={20} />

          <LargeEventItem data={itemProperty} />

          <Spacer height={30} />

          <Spacer height={0.5} color={Colors.separator} />

          <Spacer height={30} />

          <Text style={styles.headings}>Other upcoming events</Text>

          <Spacer height={20} />

          <SmallEventItem data={itemProperty} />
        </View>
      </View>

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  body: {
    marginHorizontal: Sizes.sideBorder,
    backgroundColor: Colors.background,
  },
  headings: {
    fontFamily: Font.bold,
    fontSize: 18,
    color: 'black',
  },
  overLay: {
    backgroundColor: '#00000070',
    position: 'absolute',
  },
});

export default HomeScreen;
