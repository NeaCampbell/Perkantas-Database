/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Platform,
} from 'react-native';
import { MenuBasicStyles } from '../asset/style-template/MenuBasicStyles';
import MenuScreen from './MenuScreen';

// Import needed views
import BodyBaseScreen from './BodyBaseScreen';

const BodyMenuBaseScreen = (props) => {
  const { navigation, statusBarColor } = props;
  const [showMenuScreen, setShowMenuScreen] = useState(false);

  const onBurgerClick = () => {
    setShowMenuScreen(true);
  };

  const onMenuExitClick = () => {
    setShowMenuScreen(false);
  };

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

  const overlayScreenView = (
    <MenuScreen
      onExitClick={() => onMenuExitClick()}
      navigation={navigation}
    />
  );

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
                onPress={() => onBurgerClick()}
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
              {
                (props.headerRightButton) ?? null
              }
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
    <BodyBaseScreen
      statusBarColor={statusBarColor}
      items={baseScreenItems}
      overlayScreen={showMenuScreen ? overlayScreenView : props.overlayScreen}
      loadingScreen={props.loadingScreen}
      confirmScreen={props.confirmScreen}
      errorScreen={props.errorScreen}
      childName={props.childName}
      navigation={navigation}
    />
  );
};

export default BodyMenuBaseScreen;
