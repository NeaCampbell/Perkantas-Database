/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../helper/CommonHelper';
import { SET_USER, SET_CURRENT_PAGE } from '../reducer/action/ActionConst';
import Error from './component/Error';

// Import reducer dependencies
import { connect } from 'react-redux';

const logoutapi = require('../api/out/logout');

const MenuScreen = (props) => {
  const { navigation } = props;
  const [errorText, setErrorText] = useState('');

  const onDataKTBClick = () => {
    props.dispatch({ type: SET_CURRENT_PAGE, page: 'ViewAllKTBScreen' });
    navigation.replace('ViewAllKTBScreen');
  };

  const callback = (result) => {
    if (!result.succeed) {
      setErrorText(result.errorMessage);
      return;
    }

    props.dispatch({ type: SET_USER, user: {} });
    props.dispatch({ type: SET_CURRENT_PAGE, page: 'LoginScreen' });
    navigation.replace('LoginScreen');
  };

  const errorHandler = (error) => {
    setErrorText(error.message);
  };

  const onLogoutClick = () => {
    logoutapi.logout(props.User.email, callback, errorHandler);
  };

  const onExitClick = () => {
    if (props.onExitClick)
      props.onExitClick();
  };

  const errorScreen = (
    <Error
      buttonClick={() => setErrorText('')}
      message={errorText}
    />
  );

  return (
    <ImageBackground
      source={require('../asset/img/bg-vector.png')}
      style={styles.burgerBackgroundStyle}
      resizeMode="stretch"
    >
      {
        (errorText !== '') ? errorScreen : null
      }
      <View style={styles.titleSectionStyle}>
        <View style={styles.titleTextSectionStyle}>
          <Text style={styles.titleTextStyle}>MURIDKU</Text>
        </View>
        <TouchableOpacity
          style={styles.titleExitSectionStyle}
          onPress={() => onExitClick()}
        >
          <Text style={styles.titleExitTextStyle}>kembali</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.burgerMenuStyle}
        onPress={() => onDataKTBClick()}
      >
        <Image
          source={require('../asset/img/b-dataktb.png')}
          style={styles.menuSectionStyle}
          resizeMode="contain"
        />
        <Text style={styles.bodyTextStyle}>Data KTB</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.burgerMenuStyle}
      >
        <Image
          source={require('../asset/img/b-profile.png')}
          style={styles.menuSectionStyle}
          resizeMode="contain"
        />
        <Text style={styles.bodyTextStyle}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.burgerMenuStyle}>
        <Image
          source={require('../asset/img/b-aktivasi.png')}
          style={styles.menuSectionStyle}
          resizeMode="contain"
        />
        <Text style={styles.bodyTextStyle}>Aktivasi</Text>
      </TouchableOpacity>
      <View style={styles.burgerLogoutTitleSectionStyle}>
        <Text style={styles.burgerLogoutTitleTextStyle}>Logout</Text>
      </View>
      <TouchableOpacity
        style={styles.burgerLogoutSectionStyle}
        onPress={() => onLogoutClick()}
      >
        <Text style={styles.burgerLogoutTextStyle}>x</Text>
      </TouchableOpacity>
    </ImageBackground>
  );

  // return (
  //   <BodyBaseScreen
  //     items={child}
  //     childName="MenuScreen"
  //     navigation={navigation}
  //     errorScreen={errorText !== '' ? errorScreen : null}
  //   />
  // );
};

const styles = StyleSheet.create({
  bodyContainerStyle: {
    width:'100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  burgerBackgroundStyle: {
    zIndex: 9999,
    flexDirection: 'column',
    width:'100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleSectionStyle: {
    width: '100%',
    height: ProportionateScreenSizeValue(55),
    marginBottom: ProportionateScreenSizeValue(30),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleTextSectionStyle: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: ProportionateScreenSizeValue(10),
  },
  titleTextStyle: {
    color: '#0011ff',
    fontSize: ProportionateScreenSizeValue(30),
    fontWeight: '500',
  },
  titleExitSectionStyle: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: ProportionateScreenSizeValue(10),
  },
  titleExitTextStyle: {
    fontSize: ProportionateScreenSizeValue(10),
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    color: '#000',
  },
  burgerMenuStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ProportionateScreenSizeValue(20),
    width: ProportionateScreenSizeValue(100),
    height: ProportionateScreenSizeValue(100),
    borderRadius: ProportionateScreenSizeValue(50),
    backgroundColor: '#FFF',
  },
  menuSectionStyle: {
    width: ProportionateScreenSizeValue(40),
    height: ProportionateScreenSizeValue(40),
    marginTop: ProportionateScreenSizeValue(-10),
  },
  bodyTextStyle: {
    position: 'absolute',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: ProportionateScreenSizeValue(14),
    bottom: 0,
    marginBottom: ProportionateScreenSizeValue(10),
    color: '#3B4859',
  },
  burgerLogoutTitleSectionStyle: {
    width: ProportionateScreenSizeValue(50),
    height: ProportionateScreenSizeValue(30),
    marginBottom: ProportionateScreenSizeValue(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  burgerLogoutTitleTextStyle: {
    position: 'absolute',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: ProportionateScreenSizeValue(14),
    bottom: 0,
    color: '#3B4859',
  },
  burgerLogoutSectionStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: ProportionateScreenSizeValue(50),
    height: ProportionateScreenSizeValue(50),
    borderRadius: ProportionateScreenSizeValue(50),
    backgroundColor: '#FFF',
  },
  burgerLogoutTextStyle: {
    fontSize: ProportionateScreenSizeValue(20),
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  const { Page, User } = state;
  return { Page, User };
};

export default connect(mapStateToProps)(MenuScreen);
