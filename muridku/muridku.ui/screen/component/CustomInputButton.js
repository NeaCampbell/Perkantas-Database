/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React from 'react';
import { TextInput, Text, TouchableOpacity, View } from 'react-native';

const CustomInputButton = (props) => {
  const onInputButtonClick = () => {
    if (props.onInputButtonClick)
      props.onInputButtonClick(true);
  };

  const onDeleteButtonClick = () => {
    if (props.onDeleteButtonClick)
      props.onDeleteButtonClick();
  };

  return (
    <View style={props.inputContainerStyle}>
      <TextInput
        style={props.inputStyle}
        editable={props.enableTextInput ?? false}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        value={props.value}
        onChangeText={props.onChangeText}
      />
      {
        (props.value && props.value !== '' && !props.disabled) ?
        (
          <View style={props.resetContainerStyle}>
            <TouchableOpacity
              style={props.resetButtonStyle}
              onPress={() => onDeleteButtonClick()}
              disabled={props.disabled}
            >
              <Text style={props.resetButtonTextStyle} numberOfLines={1}>✖</Text>
            </TouchableOpacity>
          </View>
        ) : null
      }
      <TouchableOpacity
        style={props.buttonContainerStyle}
        onPress={() => onInputButtonClick()}
        disabled={props.disabled}
        activeOpacity={0.4}
      >
        <Text style={props.buttonStyle} numberOfLines={1}>{props.buttonText}</Text>
      </TouchableOpacity>
      {props.container}
    </View>
  );
};

export default CustomInputButton;
