import React from 'react';
import {
  View
} from 'react-native';
import { BasicStyles } from '../asset/style-template/BasicStyles';

const BodyBaseScreen = (props) => {
  const { mainBodyStyle } = BasicStyles;

  return (
    <View style={mainBodyStyle}>
      {props.items}
    </View>
  );
}

export default BodyBaseScreen;