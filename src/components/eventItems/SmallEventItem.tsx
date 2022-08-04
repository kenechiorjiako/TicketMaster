import React from 'react';
import {StyleSheet, Text, View, Image, useWindowDimensions, TouchableWithoutFeedback} from 'react-native';
import {Colors, Font, Sizes} from '../../styles/Theme';
import Spacer from '../Spacer';
import {LocationLayout, DateLayout} from './Components';

export type EventItemProp = {
  data: {
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
    flexDirection: 'row',
  },
  textLayout: {
    marginStart: 12,
    height: 50,
    flexDirection: 'column',
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: Font.bold,
  }
});

const SmallEventItem: React.FC<any> = ({data, onPress}) => {
  const {height, width} = useWindowDimensions();

  let calculatedWidth = (width - Sizes.sideBorder * 2) * 0.3;
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

        <View style={styles.textLayout}>
          <Text style={styles.title} numberOfLines={1}>
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





export default SmallEventItem;
