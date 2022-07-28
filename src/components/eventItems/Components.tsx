import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Font } from "../../styles/Theme";

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    marginHorizontal: 20,
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
  },
  locationText: {
    fontSize: 12,
    fontFamily: Font.medium,
    color: '#7A7A7A',
  },
  dateText: {
    fontSize: 11,
    fontFamily: Font.medium,
    color: Colors.primary,
  },
});

const SmallDot: React.FC<any> = ({size, color, spacing}) => {
  return (
    <View
      style={{
        marginHorizontal: spacing ? spacing : 8,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
      }}></View>
  );
};

const LocationLayout: React.FC<any> = ({city, venue}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text style={styles.locationText}>{city}</Text>

      <SmallDot size={4} color="#D9D9D9" />

      <Text style={styles.locationText}>{venue}</Text>
    </View>
  );
};

const DateLayout: React.FC<any> = ({day, month, time}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text style={styles.dateText}>{day}</Text>

      <SmallDot size={2} color="#95C1F2" spacing={4} />

      <Text style={styles.dateText}>{month}</Text>

      <SmallDot size={2} color="#95C1F2" spacing={4} />

      <Text style={styles.dateText}>{time}</Text>
    </View>
  );
};

export {SmallDot, DateLayout, LocationLayout};
