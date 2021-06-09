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
import UserView from './component/User';
import Confirmation, { AlertMode } from './component/Confirmation';
import { BasicStyles, BasicColor, PlaceholderTextColor } from '../asset/style-template/BasicStyles';
import { BackgroundColor } from '../asset/style-template/MenuBasicStyles';
import { ActivationStyles } from '../asset/style-template/ActivationStyles';
import {
  ProportionateScreenSizeValue,
  ChangeColorFunction,
  CommonMessages,
} from '../helper/CommonHelper';
import Error from './component/Error';

const getinactiveusersapi = require('../api/out/getinactiveusers');
const activateuserapi = require('../api/out/activateuser');

const ActivationScreen = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [isFirstEntry, setIsFirstEntry] = useState(true);
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchPressed, setSearchPressed] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showConfirmScreen, setShowConfirmScreen] = useState(false);

  const callback = (result) => {
    setLoading(false);

    if (!result.succeed && result.errorMessage !== CommonMessages.DATA_NOT_FOUND) {
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

  const onUserSelected = (id, isConfirm, selected) => {
    if (!id)
      return;

    const currUser = users.filter(item => item.id === id)[0];
    const tmp = selectedUsers.filter(x => x.id !== id);

    if (!selected) {
      setSelectedUsers(tmp);
      return;
    }

    tmp.push({
      id: id,
      email: currUser.email,
      is_active: isConfirm,
    });

    setSelectedUsers(tmp);
    return;
  };

  const callbackActivation = (result) => {
    setLoading(false);

    if (!result.succeed) {
      setErrorText(result.errorMessage);
      return;
    }

    setIsFirstEntry(true);
  };

  const onConfirmActivationClick = () => {
    setShowConfirmScreen(false);

    if (!selectedUsers || selectedUsers.length === 0) {
      setErrorText('belum ada user yang dipilih');
      return;
    }

    setLoading(true);
    activateuserapi.activateuser(selectedUsers, props.User.email, callbackActivation, errorHandler);
  };

  const onCancelActivationClick = () => {
    setShowConfirmScreen(false);
  };

  if (isFirstEntry) {
    setIsFirstEntry(false);
    getinactiveusersapi.getinactiveusers(props.User.email, callback, errorHandler);
  }

  if (users && users.length > 0) {
    const groupCount = users.length;
    const groupColors = [];

    for (let i = 0; i < groupCount; i++) {
      let color = ChangeColorFunction( groupColors );
      groupColors.push(color);
    }
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
    buttonFooterEnableStyle,
    buttonFooterDisableStyle,
    submitButtonTextStyle,
    customActivityIndicatorStyle,
  } = ActivationStyles;

  const setUsersComp = (groups) => {
    const comps = [];
    if (groups && groups.length > 0) {
      let idx = 0;
      groups.forEach(element => {
        comps.push(
          <UserView
            key={idx}
            user={element}
            status={element.is_active}
            onApproveCheck={(id, checked) => onUserSelected(id, 1, checked)}
            onRejectCheck={(id, checked) => onUserSelected(id, 3, checked)}
          />
        );

        idx++;
      });
    }
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
      confirmText="Apakah anda yakin akan melakukan proses aktivasi?"
      firstButtonText="Ya"
      secondButtonText="Tidak"
      mode={AlertMode}
      onFirstButtonClick={() => onConfirmActivationClick()}
      onSecondButtonClick={() => onCancelActivationClick()}
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

  const buttonSaveEnable = (selectedUsers && selectedUsers.length > 0);

  const footer = (
    <KeyboardAvoidingView style={footerViewStyle}>
      <TouchableOpacity
        style={[buttonFooterStyle, buttonSaveEnable ? buttonFooterEnableStyle : buttonFooterDisableStyle]}
        activeOpacity={0.5}
        disabled={!buttonSaveEnable}
        onPress={() => setShowConfirmScreen(true)}
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
