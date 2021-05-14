import React, {useState, useEffect, createRef, Component} from 'react';
import {
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import SearchToggle from './component/SearchToggle';
import DiscipleshipGroup from './component/DiscipleshipGroup';
import { BasicStyles, BasicColor, PlaceholderTextColor } from '../asset/style-template/BasicStyles';
import { ViewAllKTBStyles } from '../asset/style-template/ViewAllKTBStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ProportionateScreenSizeValue
} from '../helper/CommonHelper';

const getktbapi = require('../api/out/getktbsbypktbid');

const AddKTBHistoryScreen = (props) => {
  const { globalFontStyle, basicInputStyle } = BasicStyles;
  
  const {
    bodyContainerStyle,
    searchSectionStyle,
    searchContainerStyle,
    searchTextStyle,
    footerButtonStyle,
    buttonStyle,
    customActivityIndicatorStyle
  } = ViewAllKTBStyles;

  const setKtbsComp = (groups) => {
    let comps = [];
    let idx = 0;
    groups.forEach(element => {
      comps.push(
        <DiscipleshipGroup
          group={element.ktb}
          members={element.members}
          colorHolder={groupColors[idx]}
          key={idx}
          navigation={navigation}
        />
      );

      idx++;
    });

    return comps;
  }

  let groups = undefined;

  const child = (
    <View style={bodyContainerStyle}>
      <View style={searchSectionStyle}>
        <KeyboardAvoidingView style={searchContainerStyle}
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <SearchToggle
            containerStyle={[basicInputStyle, searchContainerStyle]}
            inputStyle={[globalFontStyle, basicInputStyle, searchTextStyle]}
            placeholder="Cari KTB"
            placeholderTextColor={PlaceholderTextColor}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
            iconSize={ProportionateScreenSizeValue(20)}
          />
        </KeyboardAvoidingView>
      </View>
    </View>
  );

  const footer = (
    <View style={[searchSectionStyle, {flexDirection:'row'}]}>
      <View style={footerButtonStyle}>
        <TouchableOpacity
          style={buttonStyle}
          activeOpacity={0.5}
        >
          <Icon name="add" size={ProportionateScreenSizeValue(25)} color="white"></Icon>
        </TouchableOpacity>
      </View>
      <View style={footerButtonStyle}>
        <TouchableOpacity
          style={buttonStyle}
          activeOpacity={0.5}
        >
          <Icon name="edit" size={ProportionateScreenSizeValue(25)} color="white"></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <BodyMenuBaseScreen title="KTB" child={child} footer={footer} />
  );
};

const mapStateToProps = state => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps)(AddKTBHistoryScreen);