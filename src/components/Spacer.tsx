import React from 'react';
import {View} from 'react-native';

export type SpacerProps = {
  width?: number;
  height?: number;
  color?: string;
};

const Spacer: React.FC<SpacerProps> = ({width, height, color}) => {
  const style = {
    width: width,
    height: height ?? 1,
    backgroundColor: color,
  };

  return <View style={style}></View>;
};

export default Spacer;
