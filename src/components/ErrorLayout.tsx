import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Font, Colors } from "../styles/Theme";
import Spacer from "./Spacer";

const ErrorLayout: React.FC<any> = ({onRetry}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontFamily: Font.medium,
          fontSize: 16,
          textAlign: 'center',
          lineHeight: 25,
        }}>
        Something went wrong, please try again
      </Text>

      <Spacer height={20} />

      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          backgroundColor: Colors.primary,
          paddingHorizontal: 26,
          paddingVertical: 10,
          borderRadius: 6,
        }}
        onPress={() => {
          onRetry();
        }}>
        <Text
          style={{fontFamily: Font.medium, fontSize: 14, color: Colors.white}}>
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
};


export default ErrorLayout