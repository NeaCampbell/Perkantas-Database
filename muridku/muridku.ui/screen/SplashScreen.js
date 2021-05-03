// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  Text
} from 'react-native';
import { BasicStyles } from '../asset/style-template/BasicStyles';
import { SplashStyles } from '../asset/style-template/SplashStyles';
import {
  StyleSheet,
} from 'react-native';

// Import reducer dependencies
import { connect } from 'react-redux';

// Import needed views
import BodyBaseScreen from './BodyBaseScreen';

const checkuserapi = require("../api/out/checkuserloginstatus");

const SplashScreen = (props) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    let result = false;

    const callback = (resultapi) => {
      result = resultapi.result;
    }

    if(props.User.email !== undefined && props.User.email !== null && props.User.email !== "")
      checkuserapi.checkuserloginstatus(props.User.email, callback);

    setTimeout(() => {
      setAnimating(false);
      
      if(!result) {
        props.navigation.replace('LoginScreen');
        return;
      }

      props.navigation.replace('ViewAllKTBScreen');
    }, 3000);
  }, []);

  const { activityIndicatorStyle, LoadingViewSize } = BasicStyles;
  const { containerStyle, imgStyle, logoStyle, versionTextStyle } = SplashStyles;

  const baseScreenItems = (
    <>
      <View style={[containerStyle, { flexDirection: "column" }]}>
        <View style={{flex: 25}}>
          <Image
            source={require('../asset/img/splash-img.png')}
            style={imgStyle}
          />
        </View>
        <View style={{flex: 5}}>
          <Image
            source={require('../asset/img/logo.png')}
            style={logoStyle}
          />
        </View>
        <View style={{flex: 2}}>
          <Image
            source={require('../asset/img/logo-perkantas.png')}
            style={logoStyle}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={[versionTextStyle, {flex: 4}]}>Version 1.0.0</Text>
        </View>
      </View>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size={LoadingViewSize}
        style={activityIndicatorStyle}
      />
    </>
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

const mapStateToProps = state => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps)(SplashScreen);