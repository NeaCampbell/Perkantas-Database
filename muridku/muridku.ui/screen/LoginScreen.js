import React, {useState, useEffect, createRef} from 'react';
import {
  ActivityIndicator,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import { SET_USER } from "../reducer/action/ActionConst";
import { connect } from 'react-redux';
import BodyBaseScreen from './BodyBaseScreen';
import PasswordToggle from './component/PasswordToggle';
import { BasicStyles, BasicColor, LoadingViewSize, PlaceholderTextColor } from '../asset/style-template/BasicStyles';
import { LoginStyles } from '../asset/style-template/LoginStyles';

const loginapi = require('../api/out/login');

const LoginScreen = (props) => {
  const { navigation } = props;
  const [userEmail, setUserEmail] = useState(props.User.email);
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrorText] = useState('');
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

      if(!result.succeed) {
        setErrorText(result.errorMessage);
        return;
      }

      props.dispatch({ type: SET_USER, email: userEmail });
      resetState();
      navigation.replace('ViewAllKTBScreen');
    }

    loginapi.login(userEmail, userPassword, callback);
  };

  const { globalFontStyle, basicInputStyle, inputStyle, passwordInputStyle } = BasicStyles;
  
  const {
    bodyContainerStyle,
    logoContainerStyle,
    logoStyle,
    bodySectionStyle,
    errorTextStyle,
    buttonStyle,
    buttonTextStyle,
    forgotPwdTextStyle,
    signupTextStyle,
    signupTextButtonStyle,
    techProblemDescStyle,
    techProblemStyle,
    customActivityIndicatorStyle
  } = LoginStyles;

  const baseScreenItems = (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={bodyContainerStyle}>
      <View style={{flexDirection: 'column', flex: 1}}>
        <View style={[logoContainerStyle, {flex: 12}]}>
          <Image
            source={require('../asset/img/logo.png')}
            style={logoStyle}
          />
        </View>
        <View style={[bodySectionStyle, {flex: 2}]}>
          <TextInput
            style={[globalFontStyle, basicInputStyle, inputStyle]}
            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
            placeholder="Masukkan email anda"
            placeholderTextColor={PlaceholderTextColor}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
            ref={emailInputRef}
            value={userEmail}
          />
        </View>
        <View style={[bodySectionStyle, {flex: 5}]}>
          <PasswordToggle
            containerStyle={[globalFontStyle, basicInputStyle, inputStyle]}
            inputStyle={[globalFontStyle, basicInputStyle, passwordInputStyle]}
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
            value={userPassword}
          />
        </View>
        {(errortext != '') ? (
          <View style={[bodySectionStyle, {flex: 0.5}]}>
            <Text style={[globalFontStyle, errorTextStyle]}>
              {errortext}
            </Text>
          </View>
        ) : null}
        <View style={[bodySectionStyle, {flex: 2.5}]}>
          <TouchableOpacity
            style={buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitPress}
            >
            <Text style={[globalFontStyle, buttonTextStyle]}>
              Masuk
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[bodySectionStyle, {flex: 0.7}]}>
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
        </View>
        <View style={[bodySectionStyle, {flex: 8}]}>
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
        <View style={[bodySectionStyle, {flex: 0.7}]}>
          <Text style={[globalFontStyle, techProblemDescStyle]}>Kesulitan mengakses akun MURIDKU?</Text>
        </View>
        <View style={[bodySectionStyle, {flex: 3}]}>
          <TouchableOpacity activeOpacity={0.5}>
            <Text
              style={[globalFontStyle, techProblemStyle]}>
              Laporkan masalah teknis
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {(loading) ? 
        (<View style={customActivityIndicatorStyle}>
          <ActivityIndicator
            animating={loading}
            color={BasicColor}
            size={LoadingViewSize}
          />
        </View>) : null
      }
    </ScrollView>
  );

  return (
    <BodyBaseScreen items={baseScreenItems} />
  );
};

const mapStateToProps = state => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps)(LoginScreen);