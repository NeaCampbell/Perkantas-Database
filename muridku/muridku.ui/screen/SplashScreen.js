/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
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
} from '../asset/style-template/BasicStyles';
import { SplashStyles } from '../asset/style-template/SplashStyles';
import {
  ProportionateScreenSizeValue,
} from '../helper/CommonHelper';
import { SET_USER, SET_CURRENT_PAGE } from '../reducer/action/ActionConst';

// Import reducer dependencies
import { connect } from 'react-redux';

// Import needed views
import BodyBaseScreen from './BodyBaseScreen';

const checkuserapi = require('../api/out/checkuserloginstatus');
const checkuserondeviceapi = require('../api/out/checkuseractiveondevice');
const appJson = require('../app.json');

const SplashScreen = (props) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const { navigation } = props;

  useEffect(() => {
    const errorHandler = (error) => {
      setAnimating(false);
      props.dispatch({ type: SET_CURRENT_PAGE, page: 'LoginScreen' });
      props.navigation.replace('LoginScreen');
    };

    const callback = (result, hasLoginState) => {
      setAnimating(false);

      if (!result.succeed) {
        props.dispatch({ type: SET_CURRENT_PAGE, page: 'LoginScreen' });
        props.navigation.replace('LoginScreen');
        return;
      }

      if (!hasLoginState)
        props.dispatch({ type: SET_USER, user: result.result });

      props.dispatch({ type: SET_CURRENT_PAGE, page: 'ViewAllKTBScreen' });
      props.navigation.replace('ViewAllKTBScreen');
    };

    if (props.User && props.User !== {} && props.User.email)
      checkuserapi.checkuserloginstatus(props.User.email, (result) => callback(result, true), errorHandler);
    else
      checkuserondeviceapi.checkuseractiveondevice(callback, (result) => callback(result, false), errorHandler);
  }, []);

  const {
    customActivityIndicatorStyle,
  } = BasicStyles;

  const {
    containerStyle,
    imgContainerStyle,
    imgStyle,
    logoContainerStyle,
    logoStyle,
    logo2ContainerStyle,
    logo2Style,
    versionContainerStyle,
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
            style={logo2Style}
          />
        </View>
        <View style={versionContainerStyle}>
          <Text style={versionTextStyle}>Version {appJson.version}</Text>
        </View>
      </View>
      {
        (animating) ?
        (<View style={[customActivityIndicatorStyle]}>
          <ActivityIndicator
            animating={animating}
            color="#000"
            size={ProportionateScreenSizeValue(30)}
          />
        </View>) : null
      }
    </>
  );

  return (
    <BodyBaseScreen
      items={baseScreenItems}
      childName="SplashScreen"
      navigation={navigation}
    />
  );
};

const mapStateToProps = state => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps)(SplashScreen);
