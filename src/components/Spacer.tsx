import React from 'react';
import {View} from 'react-native';

export type SpacerProps = {
  width?: number;
  height?: number;
  color?: string;
  marginRight?: number;
  marginLeft?: number;
  marginHorizontal?: number
};

const Spacer: React.FC<SpacerProps> = (props: SpacerProps) => {
  const style = {
    width: props.width,
    height: props.height ?? 1,
    backgroundColor: props.color,
    ...props
  };

  return <View style={style}></View>;
};

export default Spacer;
