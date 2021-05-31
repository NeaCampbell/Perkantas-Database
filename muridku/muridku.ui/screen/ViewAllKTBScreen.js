/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
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
import EntryKTBScreen, { KTBAddMode } from './EntryKTBScreen';
import SearchToggle from './component/SearchToggle';
import DiscipleshipGroup from './component/DiscipleshipGroup';
import Confirmation, { AlertMode } from './component/Confirmation';
import { BasicStyles, BasicColor, PlaceholderTextColor } from '../asset/style-template/BasicStyles';
import { BackgroundColor } from '../asset/style-template/MenuBasicStyles';
import { ViewAllKTBStyles } from '../asset/style-template/ViewAllKTBStyles';
import {
  ProportionateScreenSizeValue,
  ChangeColorFunction,
} from '../helper/CommonHelper';
import { SET_SELECTED_KTB, SET_SELECTED_MEMBER, SET_CURRENT_PAGE } from '../reducer/action/ActionConst';
import Error from './component/Error';

const getktbapi = require('../api/out/getktbsbypktbid');
const getsinglektbapi = require('../api/out/getktbbyktbid');

const ViewALLKTBScreen = (props) => {
  const selectAll = 'Select All';
  const unselectAll = 'Unselect All';
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [isFirstEntry, setIsFirstEntry] = useState(true);
  const [ktbs, setKtbs] = useState([]);
  const [searchedKtbs, setSearchedKtbs] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchPressed, setSearchPressed] = useState(false);
  const [checkedMode, setCheckedMode] = useState(false);
  const [selectedKtbs, setSelectedKtbs] = useState([]);
  const [selectAllText, setSelectAllText] = useState(selectAll);
  const [forceGroupCheck, setForceGroupCheck] = useState(false);
  const [forceGroupUncheck, setForceGroupUncheck] = useState(true);
  const [showAddGroupScreen, setShowAddGroupScreen] = useState(false);
  const [shouldBackToAddScreen, setShouldBackToAddScreen] = useState(false);
  const [showConfirmScreen, setShowConfirmScreen] = useState(false);

  useEffect(() => {
    if (!checkedMode) {
      setSelectAllText(selectAll);
      setForceGroupCheck(false);
      setForceGroupUncheck(true);
      setSelectedKtbs([]);
    }
    else {
      setForceGroupUncheck(false);

      if (!searchedKtbs || searchedKtbs.length === 0) {
        setSelectedKtbs([]);
        setSelectAllText(selectAll);
      }
    }
  }, [checkedMode, searchedKtbs]);

  const onErrorBackClick = () => {
    setErrorText('');

    if (shouldBackToAddScreen) {
      setShouldBackToAddScreen(false);
      setShowAddGroupScreen(true);
    }
  };

  const callback = (result) => {
    setLoading(false);

    if (!result.succeed) {
      setErrorText(result.errorMessage);
      return;
    }

    setKtbs(result.result);
    setSearchedKtbs(result.result);
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
      setSearchedKtbs(paramGroup);
      return;
    }

    const filterKtbs = (data) => {
      return data.ktb.name.toLowerCase().search(paramSearch.toLowerCase()) > -1;
    };

    setSearchedKtbs(paramGroup.filter(filterKtbs));
  };

  const onGroupClick = (id) => {
    setLoading(true);
    const selectedKtbsTmp = searchedKtbs.filter((data) => {return data.ktb.id === id;});
    setLoading(false);

    if (selectedKtbsTmp.length === 0) {
      setErrorText('Data KTB tidak ditemukan.');
      return;
    }

    const selectedKtb = selectedKtbsTmp[0];

    props.dispatch({type: SET_SELECTED_KTB, ktb: selectedKtb});
    props.dispatch({ type: SET_CURRENT_PAGE, page: 'ViewDataKTBScreen' });
    navigation.replace('ViewDataKTBScreen');
  };

  const onGroupChecked = (id, checked) => {
    let selectedKtbsTemp = [];

    selectedKtbs.forEach((item) => {
      selectedKtbsTemp.push(item);
    });

    if (checked)
      selectedKtbsTemp.push(id);
    else
      selectedKtbsTemp = selectedKtbsTemp.filter((idx) => idx !== id);

    const isAllKtbSelected = selectedKtbsTemp.length === searchedKtbs.length;
    setForceGroupCheck(isAllKtbSelected);
    setForceGroupUncheck(false);
    setSelectAllText(isAllKtbSelected ? unselectAll : selectAll);
    setSelectedKtbs(selectedKtbsTemp);
  };

  const callbackGetKtb = (result, memberId) => {
    if (!result.succeed) {
      setLoading(false);
      setErrorText(result.errorMessage);
      return;
    }

    const selectedMember = result.result.members.filter((data) => {
      return data.member.id === memberId;
    });

    if (selectedMember.length === 0) {
      setLoading(false);
      setErrorText('Data Member tidak ditemukan.');
      return;
    }

    props.dispatch({type: SET_SELECTED_KTB, ktb: result.result});
    props.dispatch({ type: SET_SELECTED_MEMBER, member: selectedMember[0] });
    props.dispatch({ type: SET_CURRENT_PAGE, page: 'EntryDataAKKScreen' });
    navigation.replace('EntryDataAKKScreen');
  };

  const onCancelClick = () => {
    setCheckedMode(false);
  };

  const onSelectAllClick = (text) => {
    let forceGroupCheckTmp = false;

    if (text === selectAll)
      forceGroupCheckTmp = true;

    setForceGroupCheck(forceGroupCheckTmp);
    setForceGroupUncheck(!forceGroupCheckTmp);

    if (!forceGroupCheckTmp)
      setSelectedKtbs([]);
    else {
      const selectedKtbsTemp = [];

      searchedKtbs.forEach(item => {
        selectedKtbsTemp.push(item.ktb.id);
      });

      setSelectedKtbs(selectedKtbsTemp);
    }
    setSelectAllText(forceGroupCheckTmp ? unselectAll : selectAll);
  };

  const onMemberClick = (id) => {
    setLoading(true);
    const selectedKtbsTmp = searchedKtbs.filter((data) => {
      let result = false;
      data.members.forEach(element => {
        if (element.member.id === id) {
          result = true;
          return;
        }
      });
      return result;
    });

    if (selectedKtbsTmp.length === 0) {
      setLoading(false);
      setErrorText('Data KTB tidak ditemukan.');
      return;
    }

    getsinglektbapi.getktbbyktbid(selectedKtbsTmp[0].ktb.id, (result) => callbackGetKtb(result, id), errorHandler);
  };

  const onGroupLongPress = () => {
    setCheckedMode(true);
  };

  const addGroup = () => {
    console.log('tambah');
    setShowAddGroupScreen(true);
  };

  const callbackAddGroup = (result) => {

  };

  const onAddGroupNextClick = (value) => {
    setShowAddGroupScreen(false);

    if (!value || value === '') {
      setShouldBackToAddScreen(true);
      setErrorText('Nama belum diisi.');
    }
  };

  const onAddGroupCancelClick = () => {
    setShowAddGroupScreen(false);
  };

  const deleteGroup = () => {
    setShowConfirmScreen(true);
  };

  const callbackDeleteGroup = (result) => {

  };

  const onDeleteConfirmClick = () => {
    console.log('delete');
    setShowConfirmScreen(false);
  };

  const onDeleteCancelClick = () => {
    console.log('cancel delete');
    setShowConfirmScreen(false);
  };

  if (isFirstEntry) {
    setIsFirstEntry(false);
    getktbapi.getktbsbypktbid(props.User.member_id, callback, errorHandler);
  }

  const groupCount = ktbs.length;
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
    headerStyle,
    headerCancelStyle,
    headerCancelTextStyle,
    headerSelectAllStyle,
    headerSelectAllTextStyle,
    bodyContainerStyle,
    searchSectionStyle,
    searchSectionContainerStyle,
    searchTextStyle,
    searchButtonStyle,
    searchButtonTextStyle,
    footerSectionStyle,
    footerButtonSectionStyle,
    buttonStyle,
    buttonEnableStyle,
    buttonDisableStyle,
    buttonTextStyle,
    buttonTextEnableStyle,
    buttonTextDisableStyle,
    customActivityIndicatorStyle,
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
          onGroupLongPress={onGroupLongPress}
          onGroupClick={onGroupClick}
          onGroupChecked={onGroupChecked}
          onMemberClick={onMemberClick}
          isCheckedMode={checkedMode}
          forceGroupCheck={forceGroupCheck}
          forceGroupUncheck={forceGroupUncheck}
        />
      );

      idx++;
    });

    return comps;
  };

  let groups;

  if (!loading && ktbs.length > 0)
  {
    if (searchPressed)
      groups = setKtbsComp(searchedKtbs);
    else
      groups = setKtbsComp(ktbs);
  }

  const entryKTBScreen = (
    <EntryKTBScreen
      onNextClick={(value) => onAddGroupNextClick(value)}
      onCancelClick={() => onAddGroupCancelClick()}
      mode={KTBAddMode}
    />
  );

  const loadingScreen = (
    <View style={customActivityIndicatorStyle}>
      <ActivityIndicator
        animating={loading}
        color={BasicColor}
        size={ProportionateScreenSizeValue(30)}
      />
    </View>
  );

  const customHeader = (
    <View
      style={headerStyle}
    >
      <TouchableOpacity
        style={headerCancelStyle}
        activeOpacity={0.5}
        onPress={() => onCancelClick()}
      >
        <Text
          style={headerCancelTextStyle}
        >
          Cancel
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={headerSelectAllStyle}
        activeOpacity={0.5}
        onPress={() => onSelectAllClick(selectAllText)}
      >
        <Text
          style={headerSelectAllTextStyle}
        >
          {selectAllText}
        </Text>
      </TouchableOpacity>
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
        placeholder="Cari KTB"
        placeholderTextColor={PlaceholderTextColor}
        keyboardType="default"
        onSubmitEditing={Keyboard.dismiss}
        blurOnSubmit={false}
        underlineColorAndroid="#f000"
        returnKeyType="next"
        iconSize={ProportionateScreenSizeValue(20)}
        value={searchKey}
        onChangeText={setSearchKey}
        onSearchSubmit={(param) => onSearch(param, ktbs)}
      />
    </KeyboardAvoidingView>
  );

  const errorScreen = (
    <Error
      buttonClick={() => onErrorBackClick()}
      message={errorText}
    />
  );

  const confirmScreen = (
    <Confirmation
      confirmText="Apakah anda yakin akan menghapus data KTB ini?"
      firstButtonText="Ya"
      secondButtonText="Tidak"
      mode={AlertMode}
      onFirstButtonClick={() => onDeleteConfirmClick()}
      onSecondButtonClick={() => onDeleteCancelClick()}
    />
  );

  const child = (
    <KeyboardAvoidingView style={bodyContainerStyle}>
      <ScrollView>
        <View style={[{flexDirection: 'column', flex: 1}]}>
          {groups}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const footer = (
    <View style={footerSectionStyle}>
      <View style={footerButtonSectionStyle}>
        <TouchableOpacity
          style={[buttonStyle, buttonEnableStyle]}
          activeOpacity={0.5}
          onPress={() => addGroup()}
        >
          <Text style={[buttonTextStyle, buttonTextEnableStyle]}>
            Tambah
          </Text>
        </TouchableOpacity>
      </View>
      <View style={footerButtonSectionStyle}>
        <TouchableOpacity
          style={[buttonStyle, (selectedKtbs.length === 0) ? buttonDisableStyle : buttonEnableStyle]}
          activeOpacity={0.5}
          onPress={() => deleteGroup()}
          disabled={selectedKtbs.length === 0 || !checkedMode}
        >
          <Text style={[buttonTextStyle, (selectedKtbs.length === 0) ? buttonTextDisableStyle : buttonTextEnableStyle]}>
            Hapus
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <BodyMenuBaseScreen
      title="KTB"
      overlayScreen={showAddGroupScreen ? entryKTBScreen : null}
      loadingScreen={loading ? loadingScreen : null}
      confirmScreen={showConfirmScreen ? confirmScreen : null}
      errorScreen={errorText !== '' ? errorScreen : null}
      customHeader={
        (checkedMode) ? customHeader : undefined
      }
      additionalHeader={additionalHeader}
      child={child}
      footer={footer}
      childName="ViewAllKTBScreen"
      navigation={navigation}
      statusBarColor={BackgroundColor}
    />
  );
};

const mapStateToProps = state => {
  const { Page, User } = state;
  return { Page, User };
};

export default connect(mapStateToProps)(ViewALLKTBScreen);
