import React from 'react';
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Text,
  Platform
} from 'react-native';
import { MenuBasicStyles } from '../asset/style-template/MenuBasicStyles';

// Import needed views
import BodyBaseScreen from './BodyBaseScreen';

const BodyMenuBaseScreen = (props) => {
  const {
    bodyContainerStyle,
    headerSectionStyle,
    burgerStyle,
    burgerIconStyle,
    titleStyle,
    titleTextStyle,
    childContainerStyle,
    footerContainerStyle,
  } = MenuBasicStyles;

  const baseScreenItems = (
    <View style={bodyContainerStyle}>
      <View style={headerSectionStyle}>
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
      </View>
      <KeyboardAvoidingView style={childContainerStyle}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {props.child}
      </KeyboardAvoidingView>
      <KeyboardAvoidingView style={footerContainerStyle}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        {props.footer}
      </KeyboardAvoidingView>
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