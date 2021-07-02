/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import { connect } from 'react-redux';
import PasswordToggle from './component/PasswordToggle';
import { BasicStyles, PlaceholderTextColor, BasicColor } from '../asset/style-template/BasicStyles';
import { BackgroundColor } from '../asset/style-template/MenuBasicStyles';
import { UpdatePasswordStyles } from '../asset/style-template/UpdatePasswordStyles';
import { ProportionateScreenSizeValue } from '../helper/CommonHelper';
import Error from './component/Error';
import { SET_CURRENT_PAGE } from '../reducer/action/ActionConst';

const validatepasswordapi = require('../api/out/validatepassword');
const updatepasswordapi = require('../api/out/updatepassword');

const UpdatePasswordScreen = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

  const errorHandler = (error) => {
    setLoading(false);
    setErrorText(error.message);
  };

  const validateValue = () => {
    if (oldPassword === '')
      return {
        succeed: false,
        message: 'password lama kosong.',
      };

    if (newPassword === '')
      return {
        succeed: false,
        message: 'password baru kosong.',
      };

    if (oldPassword === newPassword)
      return {
        succeed: false,
        message: 'password lama tidak boleh sama dengan password baru.',
      };

    if (newPassword !== newPasswordConfirm)
      return {
        succeed: false,
        message: 'konfirmasi password tidak sesuai.',
      };

    return {
      succeed: true,
      message: '',
    };
  };

  const callbackUpdatePassword = (result) => {
    if (!result.succeed) {
      setLoading(false);
      setErrorText(result.errorMessage);
      return;
    }

    props.dispatch({ type: SET_CURRENT_PAGE, page: 'UpdateDataUserScreen' });
    setLoading(false);
    navigation.replace('UpdateDataUserScreen');
  };

  const callbackValidatePassword = (result) => {
    if (!result.succeed) {
      setLoading(false);
      setErrorText(result.errorMessage);
      return;
    }

    const currUser = result.result;
    updatepasswordapi.updatepassword(currUser.id, newPassword, callbackUpdatePassword, errorHandler);
  };

  const onSubmitClick = () => {
    setLoading(true);
    const validationResult = validateValue();

    if (!validationResult.succeed) {
      setLoading(false);
      setErrorText(validationResult.message);
      return;
    }

    validatepasswordapi.validatepassword(props.User.id, oldPassword, callbackValidatePassword, errorHandler);
  };

  const {
    globalFontStyle,
  } = BasicStyles;

  const {
    bodyContainerStyle,
    inputSectionStyle,
    inputStyle,
    customPasswordInputStyle,
    passwordButtonStyle,
    passwordButtonTextStyle,
    inputSeparatorStyle,
    buttonSectionStyle,
    buttonStyle,
    buttonTextStyle,
    customActivityIndicatorStyle,
  } = UpdatePasswordStyles;

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

  const child = (
    <View style={bodyContainerStyle}>
      <View style={inputSectionStyle}>
        <PasswordToggle
          containerStyle={inputStyle}
          textInputStyle={[globalFontStyle, customPasswordInputStyle]}
          buttonStyle={[globalFontStyle, passwordButtonStyle]}
          buttonTextStyle={passwordButtonTextStyle}
          enableButtonColor="#000"
          disableButtonColor="rgba(0, 0, 0, 0.2)"
          onChangeText={
            (oldPass) => setOldPassword(oldPass)
          }
          placeholder="Password Lama"
          placeholderTextColor={PlaceholderTextColor}
          keyboardType="default"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          underlineColorAndroid="#f000"
          returnKeyType="next"
          // refChild={passwordInputRef}
          iconSize={ProportionateScreenSizeValue(20)}
        />
        <View style={inputSeparatorStyle} />
        <PasswordToggle
          containerStyle={inputStyle}
          textInputStyle={[globalFontStyle, customPasswordInputStyle]}
          buttonStyle={[globalFontStyle, passwordButtonStyle]}
          buttonTextStyle={passwordButtonTextStyle}
          enableButtonColor="#000"
          disableButtonColor="rgba(0, 0, 0, 0.2)"
          onChangeText={
            (newPass) => setNewPassword(newPass)
          }
          placeholder="Password Baru"
          placeholderTextColor={PlaceholderTextColor}
          keyboardType="default"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          underlineColorAndroid="#f000"
          returnKeyType="next"
          // refChild={passwordInputRef}
          iconSize={ProportionateScreenSizeValue(20)}
        />
        <View style={inputSeparatorStyle} />
        <PasswordToggle
          containerStyle={inputStyle}
          textInputStyle={[globalFontStyle, customPasswordInputStyle]}
          buttonStyle={[globalFontStyle, passwordButtonStyle]}
          buttonTextStyle={passwordButtonTextStyle}
          enableButtonColor="#000"
          disableButtonColor="rgba(0, 0, 0, 0.2)"
          onChangeText={
            (confirmPass) => setNewPasswordConfirm(confirmPass)
          }
          placeholder="Konfirmasi Password Baru"
          placeholderTextColor={PlaceholderTextColor}
          keyboardType="default"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          underlineColorAndroid="#f000"
          returnKeyType="next"
          // refChild={passwordInputRef}
          iconSize={ProportionateScreenSizeValue(20)}
        />
      </View>
      <View style={buttonSectionStyle}>
        <TouchableOpacity
          style={buttonStyle}
          activeOpacity={0.5}
          onPress={() => onSubmitClick()}
        >
          <Text style={buttonTextStyle}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <BodyMenuBaseScreen
      loadingScreen={loading ? loadingScreen : null}
      errorScreen={errorText !== '' ? errorScreen : null}
      title="Ubah Password"
      child={child}
      childName="UpdatePasswordScreen"
      navigation={navigation}
      statusBarColor={BackgroundColor}
    />
  );
};

const mapStateToProps = state => {
  const { Page, User } = state;
  return { Page, User };
};

export default connect(mapStateToProps)(UpdatePasswordScreen);
