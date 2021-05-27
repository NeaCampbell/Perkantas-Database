/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
// Import React and Component
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  Text,
} from 'react-native';
import {
  BasicStyles,
  BasicColor,
} from '../asset/style-template/BasicStyles';
import { SplashStyles } from '../asset/style-template/SplashStyles';

// Import reducer dependencies
import { connect } from 'react-redux';

// Import needed views
import BodyBaseScreen from './BodyBaseScreen';

const checkuserapi = require('../api/out/checkuserloginstatus');
const appJson = require('../app.json');

const SplashScreen = (props) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    let result = false;

    const callback = (resultapi) => {
      result = resultapi.result;
    };

    if (props.User.email !== undefined && props.User.email !== null && props.User.email !== '')
      checkuserapi.checkuserloginstatus(props.User.email, callback);

    setTimeout(() => {
      setAnimating(false);

      if (!result) {
        props.navigation.replace('LoginScreen');
        return;
      }

      props.navigation.replace('ViewAllKTBScreen');
    }, 3000);
  }, []);

  const {
    customActivityIndicatorStyle,
    customActivityIndicatorSizeStyle,
  } = BasicStyles;

  const {
    containerStyle,
    imgContainerStyle,
    imgStyle,
    logoContainerStyle,
    logo2ContainerStyle,
    logoStyle,
    versionTextStyle,
  } = SplashStyles;

  const baseScreenItems = (
    <>
      <View style={containerStyle}>
        <View style={imgContainerStyle}>
          <Image
            source={require('../asset/img/splash-img.png')}
            style={imgStyle}
          />
        </View>
        <View style={logoContainerStyle}>
          <Image
            source={require('../asset/img/logo.png')}
            style={logoStyle}
          />
        </View>
        <View style={logo2ContainerStyle}>
          <Image
            source={require('../asset/img/logo-perkantas.png')}
            style={logoStyle}
          />
        </View>
        <View>
          <Text style={versionTextStyle}>Version {appJson.version}</Text>
        </View>
      </View>
      <View style={[customActivityIndicatorStyle, {backgroundColor: 'transparent'}]}>
      <ActivityIndicator
        animating={animating}
        color={BasicColor}
        style={customActivityIndicatorSizeStyle}
      />
      </View>
    </>
  );

  return (
    <BodyBaseScreen items={baseScreenItems} />
  );
};

const mapStateToProps = state => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps)(SplashScreen);
