/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  PixelRatio,
  Keyboard,
} from 'react-native';
import {
  HeaderSectionHeight,
  HeaderOtherSectionHeight,
  FooterSectionHeight,
  MenuBasicStyles,
} from '../asset/style-template/MenuBasicStyles';
import MenuScreen from './MenuScreen';
import {
  WindowSize,
} from '../helper/CommonHelper';

// Import needed views
import BodyBaseScreen from './BodyBaseScreen';

const BodyMenuBaseScreen = (props) => {
  const pixelRatio = PixelRatio.get() * 160;
  const totalHeightPercentage = pixelRatio < 300 ? 96.5 : 100;
  const normalChildHeightPercentage = (
    props.additionalHeader ? (
      props.footer ?
      (totalHeightPercentage - HeaderSectionHeight - HeaderOtherSectionHeight - FooterSectionHeight) :
      (totalHeightPercentage - HeaderSectionHeight - HeaderOtherSectionHeight)
    ) :
    (
      props.footer ?
      (totalHeightPercentage - HeaderSectionHeight - FooterSectionHeight) :
      (totalHeightPercentage - HeaderSectionHeight)
    )
  );
  const { navigation, statusBarColor } = props;
  const [showMenuScreen, setShowMenuScreen] = useState(false);
  const [childHeightPercentage, setChildHeightPercentage] = useState(normalChildHeightPercentage);
  const keyboardShowListener = useRef(null);
  const keyboardHideListener = useRef(null);

  useEffect(() => {
    const onKeyboardShow = (e) => {
      const keyboardPercentage = (e.endCoordinates.height * 100 / WindowSize.height) + 6.5;
      // const keyboardPercentage = 40;
      // console.log(`window height = ${WindowSize.height}, keyboard percentage = ${keyboardPercentage}, childHeightPercentage = ${childHeightPercentage - keyboardPercentage}`);
      setChildHeightPercentage(childHeightPercentage - keyboardPercentage);
    };

    const onKeyboardHide = () => {
      // console.log(`window height = ${WindowSize.height}, normalChildHeightPercentage = ${normalChildHeightPercentage}`);
      setChildHeightPercentage(normalChildHeightPercentage);
    };

    keyboardShowListener.current = Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    keyboardHideListener.current = Keyboard.addListener('keyboardDidHide', onKeyboardHide);

    return () => {
      keyboardShowListener.current.remove();
      keyboardHideListener.current.remove();
    };
  }, [childHeightPercentage, normalChildHeightPercentage]);

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
                <Text style={titleTextStyle} numberOfLines={1}>
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
      <View style={[childSectionStyle, {height: `${childHeightPercentage}%`}]}>
        {props.child}
      </View>
      {
        (props.footer) ?
        (
          <View style={footerSectionStyle}>
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
      onBackClick={props.onBackClick}
    />
  );
};

export default BodyMenuBaseScreen;
