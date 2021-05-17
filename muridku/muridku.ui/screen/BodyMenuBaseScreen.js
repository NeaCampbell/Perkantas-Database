import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
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
    burgerIconStyle,
    titleStyle,
    titleTextStyle,
    childSectionStyle,
    footerSectionStyle,
  } = MenuBasicStyles;

  const baseScreenItems = (
    <View style={bodyContainerStyle}>
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
                <Image
                  style={burgerIconStyle}
                  source={require('../asset/img/burger_strip.png')}
                />
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
      <View style={childSectionStyle}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {props.child}
      </View>
      <View style={footerSectionStyle}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {props.footer}
      </View>
    </View>
  );

  return (
    <BodyBaseScreen items={baseScreenItems} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default BodyMenuBaseScreen;