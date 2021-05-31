/* eslint-disable prettier/prettier */
import React, { useState, createRef } from 'react';
import {
  ActivityIndicator,
  TextInput,
  View,
  KeyboardAvoidingView,
  Text,
  Image,
  Keyboard,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SET_USER, SET_CURRENT_PAGE } from '../reducer/action/ActionConst';
import { connect } from 'react-redux';
import BodyBaseScreen from './BodyBaseScreen';
import { ProportionateScreenSizeValue } from '../helper/CommonHelper';
import PasswordToggle from './component/PasswordToggle';
import {
  BasicStyles,
  BasicColor,
  PlaceholderTextColor,
} from '../asset/style-template/BasicStyles';
import {
  LoginStyles,
  BackgroundColor,
} from '../asset/style-template/LoginStyles';
import Error from './component/Error';

const loginapi = require('../api/out/login');

const LoginScreen = (props) => {
  const { navigation } = props;
  const [userEmail, setUserEmail] = useState(props.User.email);
  const [userPassword, setUserPassword] = useState('');
  const [isStayLoggedIn, setIsStayLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const resetState = () => {
    setUserEmail(props.User.email);
    setUserPassword('');
    setIsStayLoggedIn(false);
    setLoading(false);
    setErrorText('');
  };

  const handleSubmitPress = () => {
    setErrorText('');

    if (!userEmail) {
      setErrorText('Email belum diisi.');
      emailInputRef.current.focus();
      return;
    }

    if (!userPassword) {
      setErrorText('Password belum diisi.');
      passwordInputRef.current.focus();
      return;
    }

    setLoading(true);
    const callback = (result) => {
      setLoading(false);

      if (!result.succeed) {
        setErrorText(result.errorMessage);
        return;
      }

      props.dispatch({ type: SET_USER, user: result.result });
      props.dispatch({ type: SET_CURRENT_PAGE, page: 'ViewAllKTBScreen' });
      resetState();
      navigation.replace('ViewAllKTBScreen');
    };

    const errorHandler = (error) => {
      setLoading(false);
      setErrorText(error.message);
    };

    loginapi.login(userEmail, userPassword, isStayLoggedIn ? 1 : 0, callback, errorHandler);
  };

  const {
    globalFontStyle,
    basicInputStyle,
    inputStyle,
    passwordInputStyle,
    customActivityIndicatorStyle,
  } = BasicStyles;

  const {
    bodyContainerStyle,
    logoContainerStyle,
    logoStyle,
    emailSectionStyle,
    passwordSectionStyle,
    stayLoggedInSectionStyle,
    stayLoggedInInnerStyle,
    stayLoggedInCheckBoxStyle,
    stayLoggedInCheckBoxActiveStyle,
    stayLoggedInCheckBoxActiveInnerStyle,
    stayLoggedInTextContainerStyle,
    stayLoggedInTextStyle,
    stayLoggedInTextActiveStyle,
    loginButtonSectionStyle,
    loginButtonStyle,
    loginButtonTextStyle,
    forgotPwdSectionStyle,
    forgotPwdTextStyle,
    signupSectionStyle,
    signupTextStyle,
    signupTextButtonStyle,
    techProblemDescSectionStyle,
    techProblemDescStyle,
    techProblemSectionStyle,
    techProblemStyle,
  } = LoginStyles;

  const loadingScreen = (
    <View style={customActivityIndicatorStyle}>
      <ActivityIndicator
        animating={loading}
        color={BasicColor}
        size={ProportionateScreenSizeValue(30)}
      />
    </View>
  );

  const errorScreen = (
    <Error
      buttonClick={() => setErrorText('')}
      message={errorText}
    />
  );

  const baseScreenItems = (
    <View style={bodyContainerStyle}>
      <View style={logoContainerStyle}>
        <Image
          source={require('../asset/img/logo.png')}
          style={[logoStyle]}
        />
      </View>
      <KeyboardAvoidingView
        style={emailSectionStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TextInput style={[globalFontStyle, basicInputStyle, inputStyle]}
          onChangeText={(UserEmail) => setUserEmail(UserEmail)}
          placeholder="Masukkan email anda"
          placeholderTextColor={PlaceholderTextColor}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          underlineColorAndroid="#f000"
          blurOnSubmit={false}
          ref={emailInputRef}
          value={userEmail ? userEmail.toString() : ''}
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={passwordSectionStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <PasswordToggle
          containerStyle={[basicInputStyle, inputStyle]}
          textInputStyle={[globalFontStyle, basicInputStyle, passwordInputStyle]}
          onChangeText={
            (UserPassword) => setUserPassword(UserPassword)
          }
          placeholder="Masukkan password anda"
          placeholderTextColor={PlaceholderTextColor}
          keyboardType="default"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          underlineColorAndroid="#f000"
          returnKeyType="next"
          refChild={passwordInputRef}
          value={userPassword ? userPassword.toString() : ''}
          iconSize={ProportionateScreenSizeValue(20)}
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={stayLoggedInSectionStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity style={stayLoggedInInnerStyle}
          activeOpacity={0.5}
          onPress={() => setIsStayLoggedIn(!isStayLoggedIn)}
        >
          <View style={isStayLoggedIn ? stayLoggedInCheckBoxActiveStyle : stayLoggedInCheckBoxStyle}>
            {
              (isStayLoggedIn) ?
              <Text style={stayLoggedInCheckBoxActiveInnerStyle}>✔</Text>
              :
              null
            }
          </View>
          <View style={stayLoggedInTextContainerStyle}>
            <Text style={isStayLoggedIn ? stayLoggedInTextActiveStyle : stayLoggedInTextStyle}>tetap login</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={loginButtonSectionStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity
          style={loginButtonStyle}
          activeOpacity={0.5}
          onPress={() => handleSubmitPress()}
          >
          <Text style={[globalFontStyle, loginButtonTextStyle]}>
            Masuk
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={forgotPwdSectionStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            resetState();
            // navigation.navigate('UserScreen');
          }}
          >
          <Text
            style={[globalFontStyle, forgotPwdTextStyle]}>
            Lupa Password?
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={signupSectionStyle}>
        <Text
          style={[globalFontStyle, signupTextStyle]}>
          Belum memiliki akun?
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            resetState();
            navigation.navigate('RegisterScreen');
          }}
          >
          <Text
            style={[globalFontStyle, signupTextButtonStyle]}>
            &nbsp;Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={techProblemDescSectionStyle}>
        <Text style={[globalFontStyle, techProblemDescStyle]}>Kesulitan mengakses akun MURIDKU?</Text>
      </View>
      <View style={techProblemSectionStyle}>
        <TouchableOpacity activeOpacity={0.5}>
          <Text
            style={[globalFontStyle, techProblemStyle]}>
            Laporkan masalah teknis
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <BodyBaseScreen
      loadingScreen={loading ? loadingScreen : null}
      errorScreen={errorText ? errorScreen : null}
      items={baseScreenItems}
      statusBarColor={BackgroundColor}
      childName="LoginScreen"
      navigation={navigation}
    />
  );
};

const mapStateToProps = state => {
  const { Page, User } = state;
  return { Page, User };
};

export default connect(mapStateToProps)(LoginScreen);
