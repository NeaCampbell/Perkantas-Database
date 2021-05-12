import React, {useState, useEffect, createRef, Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import BodyBaseScreen from './BodyBaseScreen';
import SearchToggle from './component/SearchToggle';
import KelompokKTB from './component/KelompokKTB';
import { BasicStyles, PlaceholderTextColor } from '../asset/style-template/BasicStyles';
import { ViewAllKTBStyles } from '../asset/style-template/ViewAllKTBStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  HeightPercentageToDP
} from '../helper/CommonHelper';

const loginapi = require('../api/out/login');

const ViewALLKTBScreen = (props) => {
  const { globalFontStyle, basicInputStyle } = BasicStyles;
  
  const {
    bodyContainerStyle,
    burgerSectionStyle,
    searchSectionStyle,
    ktbBoxSectionStyle,
    burgerStyle,
    nextStyle,
    searchInputStyle,
    loginTextStyle,
    buttonStyle,
  } = ViewAllKTBStyles;

  const baseScreenItems = (
    <View style={bodyContainerStyle}>
      <View style={[burgerSectionStyle, {flex: 3}]}>
        <TouchableOpacity
          style={burgerStyle}
          activeOpacity={0.5}
          >
          <Image
              source={require('../asset/img/burger_strip.png')}
              style={burgerStyle}
          />
        </TouchableOpacity>
        <Text style={[globalFontStyle, loginTextStyle, {flex:6}]}>
            KTB
        </Text>
        <TouchableOpacity
          style={nextStyle}
          activeOpacity={0.5}
          >
          <Image
              source={require('../asset/img/next.png')}
              style={nextStyle}
          />
        </TouchableOpacity>
      </View>
      <View style={[searchSectionStyle]}>
        <SearchToggle
          containerStyle={[globalFontStyle, basicInputStyle, searchInputStyle]}
          inputStyle={[globalFontStyle, basicInputStyle, searchInputStyle]}
          placeholder="Search"
          placeholderTextColor={PlaceholderTextColor}
          keyboardType="default"
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          underlineColorAndroid="#f000"
          returnKeyType="next"
        />
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{bodyContainerStyle, flex:4}}
      >
        <View style={{flexDirection: 'column', flex: 1}}>
          <KelompokKTB 
              containerStyle={[globalFontStyle, ktbBoxSectionStyle]}
              namaKTB="KTB Anugerah"
              reminder="Today"
              jadwal="Senin, 18.00 WIB"
              anggota1={require('../asset/img/man.png')}
              anggota2={require('../asset/img/man.png')}
          />
          <KelompokKTB 
              containerStyle={[globalFontStyle, ktbBoxSectionStyle]}
              namaKTB="KTB Momogi"
              reminder="Tomorrow"
              jadwal="Kamis, 07.00 WIB"
              anggota1={require('../asset/img/man.png')}
              anggota2={require('../asset/img/man.png')}
          />
          <KelompokKTB 
              containerStyle={[globalFontStyle, ktbBoxSectionStyle]}
              namaKTB="KTB Sukacita"
              reminder="Tomorrow"
              jadwal="Selasa, 07.00 WIB"
              anggota1={require('../asset/img/man.png')}
              anggota2={require('../asset/img/man.png')}
              anggota3={require('../asset/img/man.png')}
          />
        </View>
      </ScrollView>
      <View style={[searchSectionStyle, {flexDirection:'row'}]}>
        <View style={{flex:1, alignContent:'flex-end'}}>
          <TouchableOpacity
            style={buttonStyle}
            activeOpacity={0.5}
            >
            <Icon name="add" size={HeightPercentageToDP(25)} color="white"></Icon>
          </TouchableOpacity>
        </View>
        <View style={{flex:1}}>
          <TouchableOpacity
            style={buttonStyle}
            activeOpacity={0.5}
            >
            <Icon name="edit" size={HeightPercentageToDP(25)} color="white"></Icon>
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

export default connect(mapStateToProps)(ViewALLKTBScreen);