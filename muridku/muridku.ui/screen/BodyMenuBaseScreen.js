/* eslint-disable prettier/prettier */
import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Platform,
} from 'react-native';
import { MenuBasicStyles } from '../asset/style-template/MenuBasicStyles';

// Import needed views
import BodyBaseScreen from './BodyBaseScreen';

const BodyMenuBaseScreen = (props) => {
  const {
    bodyContainerStyle,
    headerSectionStyle,
    otherHeaderSectionStyle,
    burgerStyle,
    headerSearchMenuStyle,
    headerSearchMenuDistStyle,
    titleStyle,
    titleTextStyle,
    childSectionStyle,
    footerSectionStyle,
  } = MenuBasicStyles;

  const childHeightPercentage = props.additionalHeader ? (props.footer ? 72 : 85) :
                                                         (props.footer ? 82 : 101);

  const baseScreenItems = (
    <View style={bodyContainerStyle}>
      {
        (props.isError) ?
        props.error : null
      }
      <View style={headerSectionStyle}>
        {
          (props.customHeader) ?
          props.customHeader :
          (
            <>
              <TouchableOpacity
                style={burgerStyle}
                activeOpacity={0.5}
              >
                <View style={[headerSearchMenuStyle, headerSearchMenuDistStyle]} />
                <View style={[headerSearchMenuStyle, headerSearchMenuDistStyle]} />
                <View style={[headerSearchMenuStyle]} />
              </TouchableOpacity>
              <View style={titleStyle}>
                <Text style={titleTextStyle}>
                  {props.title}
                </Text>
              </View>
            </>
          )
        }
      </View>
      {
        (props.additionalHeader) ?
        (
          <View style={otherHeaderSectionStyle}>
            {props.additionalHeader}
          </View>
        ) : null
      }
      <View style={[childSectionStyle, {height: `${childHeightPercentage}%`}]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {props.child}
      </View>
      {
        (props.footer) ?
        (
          <View style={footerSectionStyle}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {props.footer}
          </View>
        ) : null
      }
    </View>
  );

  return (
    <BodyBaseScreen items={baseScreenItems} />
  );
};

export default BodyMenuBaseScreen;
