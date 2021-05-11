import React from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';
import { BasicStyles } from '../asset/style-template/BasicStyles';

const BodyBaseScreen = (props) => {
  const { mainBodyStyle } = BasicStyles;
  const backgroundColor = props.statusBarColor ?? "#000";

  return (
    <SafeAreaView style={mainBodyStyle}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor} />
      {props.items}
    </SafeAreaView>
  );
}

export default BodyBaseScreen;