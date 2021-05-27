/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
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
import { SET_USER } from '../reducer/action/ActionConst';
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

const loginapi = require('../api/out/login');

const LoginScreen = (props) => {
  const { navigation } = props;
  const [userEmail, setUserEmail] = useState(props.User.email);
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const resetState = () => {
    setUserEmail(props.User.email);
    setUserPassword('');
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
      resetState();
      navigation.replace('ViewAllKTBScreen');
    };

    const errorHandler = (error) => {
      setLoading(false);
      setErrorText(error.message);
    };

    loginapi.login(userEmail, userPassword, callback, errorHandler);
  };

  const {
    globalFontStyle,
    basicInputStyle,
    inputStyle,
    passwordInputStyle,
    errorSectionStyle,
    errorMessageContainerStyle,
    errorMessageTextStyle,
    errorMessageButtonStyle,
    errorMessageButtonTextStyle,
    customActivityIndicatorStyle,
    customActivityIndicatorSizeStyle,
  } = BasicStyles;

  const {
    bodyContainerStyle,
    logoContainerStyle,
    logoStyle,
    bodySectionStyle,
    buttonStyle,
    buttonTextStyle,
    forgotPwdTextStyle,
    signupTextStyle,
    signupTextButtonStyle,
    techProblemDescStyle,
    techProblemStyle,
  } = LoginStyles;

  const baseScreenItems = (
    <View style={bodyContainerStyle}>
      {
        (errorText !== '') ? (
          <View style={errorSectionStyle}>
            <View style={errorMessageContainerStyle}>
              <Text style={errorMessageTextStyle}>
                {`Error! ${errorText}`}
              </Text>
              <TouchableOpacity
                style={errorMessageButtonStyle}
                onPress={() => setErrorText('')}
              >
              <Text style={errorMessageButtonTextStyle}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null
      }
      <View style={logoContainerStyle}>
        <Image
          source={require('../asset/img/logo.png')}
          style={[logoStyle]}
        />
      </View>
      <KeyboardAvoidingView
        style={[bodySectionStyle, {marginTop: ProportionateScreenSizeValue(150)}]}
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
          value={userEmail.toString()}
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={bodySectionStyle}
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
          value={userPassword.toString()}
          iconSize={ProportionateScreenSizeValue(20)}
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={bodySectionStyle}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity
          style={buttonStyle}
          activeOpacity={0.5}
          onPress={handleSubmitPress}
          >
          <Text style={[globalFontStyle, buttonTextStyle]}>
            Masuk
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={[bodySectionStyle, {justifyContent: 'flex-start'}]}
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
      <View style={[bodySectionStyle, {justifyContent: 'flex-start'}]}>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
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
      </View>
      <View style={[bodySectionStyle, {justifyContent: 'flex-end'}]}>
        <Text style={[globalFontStyle, techProblemDescStyle]}>Kesulitan mengakses akun MURIDKU?</Text>
      </View>
      <View style={[bodySectionStyle, {justifyContent: 'flex-start'}]}>
        <TouchableOpacity activeOpacity={0.5}>
          <Text
            style={[globalFontStyle, techProblemStyle]}>
            Laporkan masalah teknis
          </Text>
        </TouchableOpacity>
      </View>
      {(loading) ?
        (<View style={customActivityIndicatorStyle}>
          <ActivityIndicator
            style={customActivityIndicatorSizeStyle}
            animating={loading}
            color={BasicColor}
          />
        </View>) : null
      }
    </View>
  );

  return (
    <BodyBaseScreen items={baseScreenItems} statusBarColor={BackgroundColor} />
  );
};

const mapStateToProps = state => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps)(LoginScreen);
