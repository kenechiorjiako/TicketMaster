import React from 'react';
import {StyleSheet, Text, View, Image, useWindowDimensions, TouchableWithoutFeedback} from 'react-native';
import {Colors, Font, Sizes} from '../../styles/Theme';
import Spacer from '../Spacer';
import {LocationLayout, DateLayout} from './Components';

export type EventItemProp = {
  data: {
    id: string
    imageSource: string;
    eventName: string;
    date: {
      day: string;
      month: string;
      time: string;
    };
    location: {
      city: string;
      venue: string;
    };
  };
};

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    backgroundColor: Colors.white,
    flexDirection: 'column',
  },
  textLayout: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 15,
    fontFamily: Font.bold,
  },
});


const LargeEventItem: React.FC<any> = ({data, onPress}) => {
  const {height, width} = useWindowDimensions();

  let calculatedWidth = (width - Sizes.sideBorder * 3);
  let calculatedHeight = (calculatedWidth * 9) / 16;

  return (
    <TouchableWithoutFeedback onPress={() => {onPress()}}>
      <View style={styles.container}>
        <Image
          style={{
            width: calculatedWidth,
            height: calculatedHeight,
            borderRadius: 6,
            backgroundColor: Colors.secondary,
          }}
          source={{uri: data.imageSource}}
        />

        <Spacer height={12} />

        <View style={styles.textLayout}>
          <Text
            style={{
              ...styles.title,
              maxWidth: calculatedWidth,
            }}
            numberOfLines={1}>
            {data.eventName}
          </Text>

          <Spacer height={6} />

          <LocationLayout
            city={data.location.venue}
            venue={data.location.city}
          />

          <Spacer height={6} />

          <DateLayout
            day={data.date.day}
            month={data.date.month}
            time={data.date.time}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LargeEventItem;
