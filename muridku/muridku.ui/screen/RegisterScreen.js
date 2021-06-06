/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, createRef} from 'react';
import {
  ActivityIndicator,
  TextInput,
  View,
  Text,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { SET_USER, SET_CURRENT_PAGE } from '../reducer/action/ActionConst';
import { connect } from 'react-redux';
import BodyBaseScreen from './BodyBaseScreen';
import PasswordToggle from './component/PasswordToggle';
import { BasicStyles, BasicColor, LoadingViewSize, PlaceholderTextColor } from '../asset/style-template/BasicStyles';
import { RegisterStyles, BackgroundColor } from '../asset/style-template/RegisterStyles';
import { ProportionateScreenSizeValue } from '../helper/CommonHelper';
import Error from './component/Error';

const registerapi = require('../api/out/registeruser');

const RegisterScreen = (props) => {
  const { navigation } = props;
  const [userFullname, setUserFullname] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [agrmntAccepted, setAgrmntAccepted] = useState(false);
  const [errorText, setErrorText] = useState('');
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

  const onAgrmntAcceptanceClick = (value) => {
    setAgrmntAccepted(value);
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

      if (!result.succeed) {
        setErrorText(result.errorMessage);
        return;
      }

      props.dispatch({ type: SET_USER, user: {email: userEmail} });
      props.dispatch({ type: SET_CURRENT_PAGE, page: 'LoginScreen' });
      resetState();
      navigation.replace('LoginScreen');
    };

    registerapi.registeruser(userFullname, userAddress, userEmail, userPassword, callback);
  };

  const {
    globalFontStyle,
    inputStyle,
  } = BasicStyles;

  const {
    bodyContainerStyle,
    logoContainerStyle,
    logoStyle,
    formContainerStyle,
    formContainerContentStyle,
    titleContainerStyle,
    titleStyle,
    formInputContainerStyle,
    formInputSectionStyle,
    bodySectionStyle,
    customInputStyle,
    customPasswordContainerStyle,
    customPasswordInputStyle,
    passwordButtonStyle,
    passwordButtonTextStyle,
    buttonContainerStyle,
    buttonSubmitStyle,
    buttonSubmitDisableStyle,
    buttonTextStyle,
    loginContainerStyle,
    loginTextStyle,
    loginTextButtonStyle,
    techProblemDescStyle,
    techProblemStyle,
    customActivityIndicatorStyle,
  } = RegisterStyles;

  // const showScrollBar = Platform.OS === 'web';

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
          style={logoStyle}
        />
      </View>
      <KeyboardAvoidingView
        style={formContainerStyle}
        contentContainerStyle={formContainerContentStyle}
        behavior="position"
      >
        <View style={titleContainerStyle}>
          <Text style={titleStyle} numberOfLines={1}>
            Daftar MURIDKU
          </Text>
        </View>
        <View
          style={formInputContainerStyle}
        >
          <View style={formInputSectionStyle}>
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
              autoFocus={true}
            />
          </View>
          <View style={formInputSectionStyle}>
            <TextInput
              style={[globalFontStyle, customInputStyle, inputStyle]}
              onChangeText={(addr) => setUserAddress(addr)}
              placeholder="Alamat"
              placeholderTextColor={PlaceholderTextColor}
              autoCapitalize="sentences"
              returnKeyType="next"
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              ref={fullnameInputRef}
              value={userAddress}
            />
          </View>
          <View style={formInputSectionStyle}>
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
          <View style={formInputSectionStyle}>
            <PasswordToggle
              containerStyle={[globalFontStyle, customInputStyle, customPasswordContainerStyle]}
              textInputStyle={[globalFontStyle, inputStyle, customPasswordInputStyle]}
              buttonStyle={[globalFontStyle, passwordButtonStyle]}
              buttonTextStyle={passwordButtonTextStyle}
              enableButtonColor="#000"
              disableButtonColor="rgba(0, 0, 0, 0.2)"
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
              iconSize={ProportionateScreenSizeValue(20)}
            />
          </View>
          <View style={formInputSectionStyle}>
            <PasswordToggle
              containerStyle={[globalFontStyle, customInputStyle, customPasswordContainerStyle]}
              textInputStyle={[globalFontStyle, inputStyle, customPasswordInputStyle]}
              buttonStyle={[globalFontStyle, passwordButtonStyle]}
              buttonTextStyle={passwordButtonTextStyle}
              enableButtonColor="#000"
              disableButtonColor="rgba(0, 0, 0, 0.2)"
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
              iconSize={ProportionateScreenSizeValue(20)}
            />
          </View>
          <View style={[formInputSectionStyle, {justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row'}]}>
            <TouchableOpacity
              style={{
                width: ProportionateScreenSizeValue(20),
                height: ProportionateScreenSizeValue(20),
                borderWidth: ProportionateScreenSizeValue(1),
                borderRadius: ProportionateScreenSizeValue(3),
                borderColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => onAgrmntAcceptanceClick(!agrmntAccepted)}
            >
              {
                (agrmntAccepted) ?
                <Text>✔</Text>
                :
                null
              }
            </TouchableOpacity>
            <View style={{
              paddingHorizontal: ProportionateScreenSizeValue(5),
              height: ProportionateScreenSizeValue(20),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: ProportionateScreenSizeValue(11),
              }} numberOfLines={1}>
                Saya menyetujui&nbsp;
              </Text>
              <TouchableOpacity>
              <Text style={{
                fontSize: ProportionateScreenSizeValue(11),
                color: '#E37550',
              }}>
                ketentuan yang berlaku.
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={buttonContainerStyle}>
        <View style={bodySectionStyle}>
          <TouchableOpacity
            style={agrmntAccepted ? buttonSubmitStyle : buttonSubmitDisableStyle}
            activeOpacity={0.5}
            onPress={handleSubmitPress}
            disabled={!agrmntAccepted}
            >
            <Text style={[globalFontStyle, buttonTextStyle]}>
              Daftar
            </Text>
          </TouchableOpacity>
        </View>
        <View style={loginContainerStyle}>
          <Text
            style={[globalFontStyle, loginTextStyle]}>
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
              style={[globalFontStyle, loginTextButtonStyle]}>
              &nbsp;Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[bodySectionStyle, {alignItems: 'flex-end'}]}>
          <Text style={[globalFontStyle, techProblemDescStyle]}>Kesulitan mengakses akun MURIDKU?</Text>
        </View>
        <View style={[bodySectionStyle, {alignItems: 'flex-start'}]}>
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
              animating={loading}
              color={BasicColor}
              size={LoadingViewSize}
            />
          </View>) : null
        }
      </View>
    </View>
  );

  return (
    <BodyBaseScreen
      items={baseScreenItems}
      statusBarColor={BackgroundColor}
      childName="RegisterScreen"
      navigation={navigation}
      errorScreen={errorText !== '' ? errorScreen : null}
    />
  );
};

const mapStateToProps = state => {
  const { Page, User } = state;
  return { Page, User };
};

export default connect(mapStateToProps)(RegisterScreen);
