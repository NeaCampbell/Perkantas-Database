/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  PlaceholderTextColor,
} from '../asset/style-template/BasicStyles';
import {
  EntryKTBStyles,
} from '../asset/style-template/EntryKTBStyles';

const EntryKTBScreen = (props) => {
  const [ktbName, setKtbName] = useState('');

  const onNextClick = () => {
    if (props.onNextClick)
      props.onNextClick(ktbName);
  };

  const onCancelClick = () => {
    if (props.onCancelClick)
      props.onCancelClick();
  };

  const {
    bodyContainerStyle,
    boxSectionStyle,
    titleSectionStyle,
    titleTextStyle,
    inputSectionStyle,
    inputStyle,
    buttonSectionStyle,
    buttonInnerSectionStyle,
    buttonStyle,
    buttonNextStyle,
    buttonNextTextStyle,
    buttonCancelStyle,
    buttonCancelTextStyle,
  } = EntryKTBStyles;

  return (
    <View style={bodyContainerStyle}>
      <View style={boxSectionStyle}>
        <View style={titleSectionStyle}>
          <Text style={titleTextStyle}>
            {props.mode === KTBAddMode ? 'Add KTB' : 'Edit KTB'}
          </Text>
        </View>
        <View style={inputSectionStyle}>
          <TextInput
            style={inputStyle}
            placeholder="Nama KTB"
            placeholderTextColor={PlaceholderTextColor}
            value={ktbName}
            onChangeText={(value) => setKtbName(value)}
          />
        </View>
        <View style={buttonSectionStyle}>
          <View style={buttonInnerSectionStyle}>
            <TouchableOpacity
              style={[buttonStyle, buttonNextStyle]}
              onPress={() => onNextClick()}
            >
              <Text style={buttonNextTextStyle}>
                {props.mode === KTBAddMode ? 'Next' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={buttonInnerSectionStyle}>
            <TouchableOpacity
              style={[buttonStyle, buttonCancelStyle]}
              onPress={() => onCancelClick()}
            >
              <Text style={buttonCancelTextStyle}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EntryKTBScreen;
export const KTBAddMode = 'ADD';
export const KTBEditMode = 'EDIT';
