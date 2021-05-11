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
import { AddKTBHistoryStyles } from '../asset/style-template/AddKTBHistoryStyles';

const checkuserapi = require("../api/out/checkuserloginstatus");

const AddKTBHistoryScreen = (props) => {
  const [animating, setAnimating] = useState(true);
  const [memberName, setMemberName] = useState("");

  useEffect(() => {
    let result = false;

    const callback = (resultapi) => {
      result = resultapi.result;
    }

    if(props.User.email !== undefined && props.User.email !== null && props.User.email !== "")
      checkuserapi.checkuserloginstatus(props.User.email, callback);

    setTimeout(() => {
      setAnimating(false);
      
      if(!result || result.is_logged_in === 0) {
        props.navigation.replace('LoginScreen');
        return;
      }
      
      setMemberName(result)
    }, 3000);
  }, []);
  
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
  } = AddKTBHistoryStyles;

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
            placeholder="Masukkan email anda"
            placeholderTextColor={PlaceholderTextColor}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
          />
        </View>
        <View style={[bodySectionStyle, {flex: 5}]}>
          <PasswordToggle
            containerStyle={[globalFontStyle, basicInputStyle, inputStyle]}
            inputStyle={[globalFontStyle, basicInputStyle, passwordInputStyle]}
            placeholder="Masukkan password anda"
            placeholderTextColor={PlaceholderTextColor}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
          />
        </View>
        <View style={[bodySectionStyle, {flex: 2.5}]}>
          <TouchableOpacity
            style={buttonStyle}
            activeOpacity={0.5}
            >
            <Text style={[globalFontStyle, buttonTextStyle]}>
              Masuk
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[bodySectionStyle, {flex: 0.7}]}>
          <TouchableOpacity
            activeOpacity={0.5}
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

export default connect(mapStateToProps)(AddKTBHistoryScreen);