// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  Text
} from 'react-native';
import Constants from 'expo-constants';

// Import reducer dependencies
import { connect } from 'react-redux';

import AsyncStorage from '@react-native-community/async-storage';

// Import needed views
import BodyBaseScreen from './BodyBaseScreen';

const SplashScreen = (props) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      // AsyncStorage.getItem('user_id').then((value) =>
      //   navigation.replace(
      //     value === null ? 'LoginScreen' : 'DrawerNavigationRoutes'
      //   ),
      // );
      props.navigation.replace('LoginScreen');
    }, 3000);
  }, []);

  const { activityIndicatorStyle } = props.PageStyles.BasicStyles;
  const { containerStyle, logoStyle, versionTextStyle } = props.PageStyles.SplashStyles;
  const { LoadingViewSize } = props.PageStyles;

  const baseScreenItems = (
    <View style={containerStyle}>
      <Image
        source={require('../asset/img/Logo.png')}
        style={logoStyle}
      />
      <Text style={versionTextStyle}>Version {Constants.manifest.version}</Text>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size={LoadingViewSize}
        style={activityIndicatorStyle}
      />
    </View>
  );

  return (
    <BodyBaseScreen items={baseScreenItems} />
  );
};

const mapStateToProps = state => {
  const { PageStyles } = state;
  return { PageStyles };
};

export default connect(mapStateToProps)(SplashScreen);