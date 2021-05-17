import React, {useState, useEffect, createRef, Component} from 'react';
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
import { BasicStyles, BasicColor, LoadingViewSize, PlaceholderTextColor } from '../asset/style-template/BasicStyles';
import { UpdateKTBStyles } from '../asset/style-template/UpdateKTBStyles';


const loginapi = require('../api/out/login');

const UpdateDataKTBScreen = (props) => {
  const { globalFontStyle, basicInputStyle, inputStyle, passwordInputStyle } = BasicStyles;
  
  const {
    bodyContainerStyle2,
    loginTextStyle,
    bodySectionStyle,
    buttonStyle,
    buttonTextStyle,
  } = UpdateKTBStyles;

  const baseScreenItems = (
    <View style={bodyContainerStyle2}>
        <View style={[bodySectionStyle]}>
          <Text style={[globalFontStyle, loginTextStyle, {flex:6}]}>
              Anda yakin ingin menghapus kelompok ini?
          </Text>
        </View>
        <View style={[bodySectionStyle], {flexDirection:'row'}}>
            <View style={[bodySectionStyle, {flex: 1}]}>
            <TouchableOpacity
                style={buttonStyle}
                activeOpacity={0.5}
                >
                <Text style={[globalFontStyle, buttonTextStyle]}>
                CANCEL
                </Text>
            </TouchableOpacity>
            </View>
            <View style={[bodySectionStyle, {flex: 1}]}>
            <TouchableOpacity
                style={buttonStyle}
                activeOpacity={0.5}
                >
                <Text style={[globalFontStyle, buttonTextStyle]}>
                DELETE
                </Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
  );

  return (
    <BodyBaseScreen items={baseScreenItems} />
  );
};

const mapStateToProps = state => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps)(UpdateDataKTBScreen);