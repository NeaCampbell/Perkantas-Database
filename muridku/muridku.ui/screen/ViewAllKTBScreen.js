/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
import DiscipleshipGroup from './component/DiscipleshipGroup';
import { BasicStyles, BasicColor, PlaceholderTextColor } from '../asset/style-template/BasicStyles';
import { ViewAllKTBStyles } from '../asset/style-template/ViewAllKTBStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ProportionateScreenSizeValue,
  ChangeColorFunction,
} from '../helper/CommonHelper';
import { SET_SELECTED_KTB, SET_SELECTED_MEMBER } from '../reducer/action/ActionConst';

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
  const [forceGroupUncheck, setForceGroupUncheck] = useState(false);

  const resetState = (needResetData = true) => {
    setSearchKey('');
    setSearchPressed(false);
    setCheckedMode(false);
    setSelectedKtbs([]);
    setSelectAllText(selectAll);
    setForceGroupCheck(false);
    setForceGroupUncheck(false);
    setErrorText('');

    if (needResetData)
      setIsFirstEntry(true);
  };

  const callback = (result) => {
    setIsFirstEntry(false);
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
    navigation.replace('ViewDataKTBScreen');
  };

  const onGroupChecked = (id, checked) => {
    let selectedKtbsTemp = [];

    selectedKtbs.forEach((item) => {
      selectedKtbsTemp.push(item);
    });

    if (!selectedKtbs.find((idx) => idx === id) && checked)
      selectedKtbsTemp.push(id);
    else if (selectedKtbs.find((idx) => idx === id) && !checked)
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
    navigation.replace('EntryDataAKKScreen');
  };

  const onMemberClick = (id) => {
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
    console.log('add group');
  };

  const deleteGroup = () => {
    console.log('delete group');
  };

  if (isFirstEntry)
    getktbapi.getktbsbypktbid(props.User.member_id, callback, errorHandler);

  const groupCount = ktbs.length;
  const groupColors = [];

  for (let i = 0; i < groupCount; i++) {
    let color = ChangeColorFunction( groupColors );
    groupColors.push(color);
  }

  const {
    globalFontStyle,
    basicInputStyle,
    errorSectionStyle,
    errorMessageContainerStyle,
    errorMessageTextStyle,
    errorMessageButtonStyle,
    errorMessageButtonTextStyle,
  } = BasicStyles;

  const {
    headerStyle,
    headerCancelStyle,
    headerCancelTextStyle,
    headerSelectAllStyle,
    headerSelectAllTextStyle,
    bodyContainerStyle,
    searchSectionStyle,
    searchContainerStyle,
    searchTextStyle,
    footerViewStyle,
    buttonStyle,
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

  const additionalHeader = (
    <KeyboardAvoidingView style={[searchSectionStyle, searchContainerStyle]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
        value={searchKey}
        onChangeText={setSearchKey}
        onSearchSubmit={(param) => onSearch(param, ktbs)}
      />
    </KeyboardAvoidingView>
  );

  const child = (
    <KeyboardAvoidingView style={bodyContainerStyle}>
      {
        (errorText !== '') ? (
          <View style={errorSectionStyle}>
            <View style={errorMessageContainerStyle}>
              <Text style={errorMessageTextStyle}>
                {`Error! ${errorText}`}
              </Text>
              <TouchableOpacity
                style={errorMessageButtonStyle}
                onPress={() => setErrorText('')}
              >
              <Text style={errorMessageButtonTextStyle}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null
      }
      <ScrollView>
        <View style={[{flexDirection: 'column', flex: 1}]}>
          {groups}
        </View>
      </ScrollView>
      {(loading) ?
        (<View style={customActivityIndicatorStyle}>
          <ActivityIndicator
            animating={loading}
            color={BasicColor}
            size={ProportionateScreenSizeValue(ProportionateScreenSizeValue(30))}
          />
        </View>) : null
      }
    </KeyboardAvoidingView>
  );

  const footer = (
    <View style={searchSectionStyle}>
      <View style={footerViewStyle}>
        <TouchableOpacity
          style={buttonStyle}
          activeOpacity={0.5}
          onPress={() => addGroup()}
        >
          <Icon name="add" size={ProportionateScreenSizeValue(25)} color="white"/>
        </TouchableOpacity>
      </View>
      <View style={footerViewStyle}>
        <TouchableOpacity
          style={buttonStyle}
          activeOpacity={0.5}
          onPress={() => deleteGroup()}
          disabled={selectedKtbs.length === 0}
        >
          <Icon name="delete" size={ProportionateScreenSizeValue(25)} color="white"/>
        </TouchableOpacity>
      </View>
    </View>
  );

  const onCancelClick = () => {
    resetState(false);
  };

  const onSelectAllClick = (text) => {
    let forceGroupCheckTmp = false;

    if (text === selectAll)
      forceGroupCheckTmp = true;

    setForceGroupCheck(forceGroupCheckTmp);
    setForceGroupUncheck(!forceGroupCheckTmp);

    if (!forceGroupCheckTmp)
      setSelectedKtbs([]);

    setSelectAllText(forceGroupCheckTmp ? unselectAll : selectAll);
  };

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

  return (
    <BodyMenuBaseScreen
      title="KTB"
      customHeader={
        (checkedMode) ? customHeader : undefined
      }
      additionalHeader={additionalHeader}
      child={child}
      footer={footer}
    />
  );
};

const mapStateToProps = state => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps)(ViewALLKTBScreen);
