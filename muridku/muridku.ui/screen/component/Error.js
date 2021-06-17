/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { BasicStyles } from '../../asset/style-template/BasicStyles';

const Error = (props) => {
  const onButtonClick = () => {
    if (props.buttonClick)
      props.buttonClick();
  };

  const {
    errorSectionStyle,
    errorMessageContainerStyle,
    errorMessageTextStyle,
    errorMessageButtonStyle,
    errorMessageButtonTextStyle,
  } = BasicStyles;

  return (
    <View style={errorSectionStyle}>
      <View style={errorMessageContainerStyle}>
        <Text style={errorMessageTextStyle} numberOfLines={2}>
          {`${props.message ?? ''}`}
        </Text>
        <TouchableOpacity
          style={errorMessageButtonStyle}
          onPress={() => onButtonClick()}
        >
        <Text style={errorMessageButtonTextStyle} numberOfLines={1}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Error;
