/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import SearchToggle from './component/SearchToggle';
import User from './component/User';
import Confirmation, { AlertMode } from './component/Confirmation';
import { BasicStyles, BasicColor, PlaceholderTextColor } from '../asset/style-template/BasicStyles';
import { BackgroundColor } from '../asset/style-template/MenuBasicStyles';
import { ActivationStyles } from '../asset/style-template/ActivationStyles';
import {
  ProportionateScreenSizeValue,
  ChangeColorFunction,
} from '../helper/CommonHelper';
import Error from './component/Error';

const getinactiveusersapi = require('../api/out/getinactiveusers');

const ActivationScreen = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [isFirstEntry, setIsFirstEntry] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchPressed, setSearchPressed] = useState(false);
  const [selectedAcceptedUsers, setSelectedAcceptedUsers] = useState([]);
  const [selectedRejectedUsers, setSelectedRejectedUsers] = useState([]);
  const [showConfirmScreen, setShowConfirmScreen] = useState(false);

  const callback = (result) => {
    setLoading(false);

    if (!result.succeed) {
      setErrorText(result.errorMessage);
      return;
    }

    setUsers(result.result);
    setSearchedUsers(result.result);
  };

  const errorHandler = (error) => {
    setErrorText(error.mesage);
    setLoading(false);
  };

  const onSearch = (paramSearch, paramGroup) => {
    if (paramGroup.length === 0)
      return;

    setSearchPressed(true);

    if (paramSearch === undefined || paramSearch === null || paramSearch === '')
    {
      setSearchedUsers(paramGroup);
      return;
    }

    const filterUsers = (data) => {
      return data.name.toLowerCase().search(paramSearch.toLowerCase()) > -1 || data.email.toLowerCase().search(paramSearch.toLowerCase()) > -1;
    };

    setSearchedUsers(paramGroup.filter(filterUsers));
  };

  if (isFirstEntry) {
    setIsFirstEntry(false);
    getinactiveusersapi.getinactiveusers(props.User.email, callback, errorHandler);
  }

  const groupCount = users.length;
  const groupColors = [];

  for (let i = 0; i < groupCount; i++) {
    let color = ChangeColorFunction( groupColors );
    groupColors.push(color);
  }

  const {
    globalFontStyle,
    basicInputStyle,
  } = BasicStyles;

  const {
    bodyContainerStyle,
    searchSectionStyle,
    searchSectionContainerStyle,
    searchTextStyle,
    searchButtonStyle,
    searchButtonTextStyle,
    footerViewStyle,
    buttonFooterStyle,
    submitButtonTextStyle,
    customActivityIndicatorStyle,
  } = ActivationStyles;

  const setUsersComp = (groups) => {
    let comps = [];
    let idx = 0;
    groups.forEach(element => {
      comps.push(
        <User
          key={idx}
          user={element}
        />
      );

      idx++;
    });

    return comps;
  };

  let groups = [];

  if (!loading)
  {
    if (searchPressed)
      groups = setUsersComp(searchedUsers);
    else
      groups = setUsersComp(users);
  }

  const loadingScreen = (
    <View style={customActivityIndicatorStyle}>
      <ActivityIndicator
        animating={loading}
        color={BasicColor}
        size={ProportionateScreenSizeValue(30)}
      />
    </View>
  );

  const additionalHeader = (
    <KeyboardAvoidingView style={searchSectionStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* <TextInput style={{width: '90%', borderWidth: 1, height: '70%'}}/> */}
      <SearchToggle
        containerStyle={searchSectionContainerStyle}
        inputStyle={[globalFontStyle, basicInputStyle, searchTextStyle]}
        buttonStyle={searchButtonStyle}
        buttonTextStyle={searchButtonTextStyle}
        placeholder="Cari User"
        placeholderTextColor={PlaceholderTextColor}
        keyboardType="default"
        onSubmitEditing={Keyboard.dismiss}
        blurOnSubmit={false}
        underlineColorAndroid="#f000"
        returnKeyType="next"
        iconSize={ProportionateScreenSizeValue(20)}
        value={searchKey}
        onChangeText={setSearchKey}
        onSearchSubmit={(param) => onSearch(param, users)}
      />
    </KeyboardAvoidingView>
  );

  const errorScreen = (
    <Error
      buttonClick={() => setErrorText('')}
      message={errorText}
    />
  );

  const confirmScreen = (
    <Confirmation
      confirmText="Apakah anda yakin akan menghapus data KTB ini?"
      firstButtonText="Ya"
      secondButtonText="Tidak"
      mode={AlertMode}
      // onFirstButtonClick={() => onDeleteConfirmClick()}
      // onSecondButtonClick={() => onDeleteCancelClick()}
    />
  );

  const child = (
    <KeyboardAvoidingView style={bodyContainerStyle}>
      <ScrollView keyboardDismissMode="on-drag">
        <View style={[{flexDirection: 'column', flex: 1}]}>
          {groups}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const footer = (
    <KeyboardAvoidingView style={footerViewStyle}>
      <TouchableOpacity
        style={buttonFooterStyle}
        activeOpacity={0.5}
      >
        <Text style={[globalFontStyle, submitButtonTextStyle]} numberOfLines={1}>Save</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );

  return (
    <BodyMenuBaseScreen
      title="Aktivasi User"
      loadingScreen={loading ? loadingScreen : null}
      confirmScreen={showConfirmScreen ? confirmScreen : null}
      errorScreen={errorText !== '' ? errorScreen : null}
      additionalHeader={additionalHeader}
      child={child}
      footer={footer}
      childName="ActivationScreen"
      navigation={navigation}
      statusBarColor={BackgroundColor}
    />
  );
};

const mapStateToProps = state => {
  const { Page, User } = state;
  return { Page, User };
};

export default connect(mapStateToProps)(ActivationScreen);
