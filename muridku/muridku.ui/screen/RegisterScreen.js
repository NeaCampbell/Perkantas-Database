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
import { RegisterStyles } from '../asset/style-template/RegisterStyles';

const registerapi = require('../api/out/registeruser');

const RegisterScreen = (props) => {
  const { navigation } = props;
  const [userFullname, setUserFullname] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrorText] = useState('');
  const fullnameInputRef = createRef();
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordConfirmInputRef = createRef();
  
  const resetState = () => {
    setUserFullname('');
    setUserAddress('');
    setUserEmail('');
    setUserPassword('');
    setUserPasswordConfirm('');
    setLoading(false);
    setErrorText('');
  };

  const handleSubmitPress = () => {
    setErrorText('');
    
    if (!userFullname) {
      setErrorText('Nama lengkap belum diisi.');
      fullnameInputRef.current.focus();
      return;
    }
    
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

    if (!userPasswordConfirm) {
      setErrorText('Konfirmasi password belum diisi.');
      passwordConfirmInputRef.current.focus();
      return;
    }

    if (userPassword !== userPasswordConfirm) {
      setErrorText('Konfirmasi password berbeda dengan password.');
      passwordConfirmInputRef.current.focus();
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
      navigation.replace('LoginScreen');
    }

    registerapi.registeruser(userFullname, userAddress, userEmail, userPassword, callback);
  };

  const { globalFontStyle, inputStyle, passwordInputStyle } = BasicStyles;
  
  const {
    bodyContainerStyle,
    logoContainerStyle,
    logoStyle,
    titleContainerStyle,
    titleStyle,
    bodySectionStyle,
    errorTextStyle,
    customInputStyle,
    customInputPasswordStyle,
    buttonStyle,
    buttonTextStyle,
    signupTextStyle,
    signupTextButtonStyle,
    techProblemDescStyle,
    techProblemStyle,
    customActivityIndicatorStyle
  } = RegisterStyles;

  const baseScreenItems = (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={bodyContainerStyle}>
      <View style={{flexDirection: 'column', flex: 1}}>
        <View style={[logoContainerStyle, {flex: 5}]}>
          <Image
            source={require('../asset/img/logo.png')}
            style={logoStyle}
          />
        </View>
        <View style={{flex: 23, backgroundColor: "#FFFFFF"}}>
          <View style={[titleContainerStyle, {flex: 2}]}>
            <Text style={titleStyle}>Buat Akun</Text>
          </View>
          <View style={[bodySectionStyle, {flex: 2}]}>
            <TextInput
              style={[globalFontStyle, customInputStyle, inputStyle]}
              onChangeText={(UserFullname) => setUserFullname(UserFullname)}
              placeholder="Nama lengkap"
              placeholderTextColor={PlaceholderTextColor}
              autoCapitalize="sentences"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              ref={emailInputRef}
              value={userFullname}
            />
          </View>
          <View style={[bodySectionStyle, {flex: 2}]}>
            <TextInput
              style={[globalFontStyle, customInputStyle, inputStyle]}
              onChangeText={(addr) => setUserAddress(addr)}
              placeholder="Alamat"
              placeholderTextColor={PlaceholderTextColor}
              autoCapitalize="none"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              ref={fullnameInputRef}
              value={userAddress}
            />
          </View>
          <View style={[bodySectionStyle, {flex: 2}]}>
            <TextInput
              style={[globalFontStyle, customInputStyle, inputStyle]}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              placeholder="Email"
              placeholderTextColor={PlaceholderTextColor}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              ref={fullnameInputRef}
              value={userEmail}
            />
          </View>
          <View style={[bodySectionStyle, {flex: 2}]}>
            <PasswordToggle
              containerStyle={[globalFontStyle, customInputStyle, inputStyle]}
              inputStyle={[globalFontStyle, customInputPasswordStyle, passwordInputStyle]}
              onChangeText={
                (UserPassword) => setUserPassword(UserPassword)
              }
              placeholder="Password"
              placeholderTextColor={PlaceholderTextColor}
              keyboardType="default"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              underlineColorAndroid="#f000"
              returnKeyType="next"
              refChild={passwordInputRef}
            />
          </View>
          <View style={[bodySectionStyle, {flex: 5}]}>
            <PasswordToggle
              containerStyle={[globalFontStyle, customInputStyle, inputStyle]}
              inputStyle={[globalFontStyle, customInputPasswordStyle, passwordInputStyle]}
              onChangeText={
                (UserPassword) => setUserPasswordConfirm(UserPassword)
              }
              placeholder="Konfirmasi password"
              placeholderTextColor={PlaceholderTextColor}
              keyboardType="default"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              underlineColorAndroid="#f000"
              returnKeyType="next"
              refChild={passwordConfirmInputRef}
            />
          </View>
          {(errortext != '') ? (
            <View style={[bodySectionStyle, {flex: 1}]}>
              <Text style={[globalFontStyle, errorTextStyle]}>
                {errortext}
              </Text>
            </View>
          ) : null}
          <View style={[bodySectionStyle, {flex: 3}]}>
            <TouchableOpacity
              style={buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
              >
              <Text style={[globalFontStyle, buttonTextStyle]}>
                Daftar
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[bodySectionStyle, {flex: 8}]}>
            <Text
              style={[globalFontStyle, signupTextStyle]}>
              Sudah memiliki akun?
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                resetState();
                navigation.navigate('LoginScreen');
              }}
              >
              <Text
                style={[globalFontStyle, signupTextButtonStyle]}>
                &nbsp;Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[bodySectionStyle, {flex: 1}]}>
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

export default connect(mapStateToProps)(RegisterScreen);