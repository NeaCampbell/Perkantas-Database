/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import { BasicColor } from '../asset/style-template/BasicStyles';
import { ViewDataKTBStyles } from '../asset/style-template/ViewDataKTBStyles';
import { BackgroundColor } from '../asset/style-template/MenuBasicStyles';
import { SET_SELECTED_KTB, SET_SELECTED_MEMBER, SET_CURRENT_PAGE } from '../reducer/action/ActionConst';
import EntryKTBScreen, { KTBEditMode } from './EntryKTBScreen';
import Disciple from './component/Disciple';
import Error from './component/Error';
import {
  ProportionateScreenSizeValue,
} from '../helper/CommonHelper';
import Confirmation, { AlertMode } from './component/Confirmation';

const getktbapi = require('../api/out/getktbbyktbid');
const updatesinglektbapi = require('../api/out/updatesinglektb');
const updateaktbstatusapi = require('../api/out/updateaktbstatusbylistid');
const deletememberapi = require('../api/out/deletektbmemberbylistid');

const ViewDataKTBScreen = (props) => {
  const selectAll = 'Select All';
  const unselectAll = 'Unselect All';
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const [isFirstEntry, setIsFirstEntry] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [ktbName, setKtbName] = useState(props.KTB.ktb.name);
  const [checkedMode, setCheckedMode] = useState(false);
  const [selectAllText, setSelectAllText] = useState(selectAll);
  const [showEditGroupScreen, setShowEditGroupScreen] = useState(false);
  const [memberActiveStates, setMemberActiveStates] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [forceMemberCheck, setForceMemberCheck] = useState(false);
  const [forceMemberUncheck, setForceMemberUncheck] = useState(false);
  const [showConfirmScreen, setShowConfirmScreen] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [errorText]);

  useEffect(() => {
    if (!checkedMode)
      setSelectedMembers([]);
  }, [checkedMode]);

  useEffect(() => {
    if (!selectedMembers || selectedMembers.length === 0)
      setSelectAllText(selectAll);
  }, [selectedMembers]);

  const errorHandler = (error) => {
    if (isFirstEntry)
      setIsFirstEntry(false);

    setErrorText(error.message);
  };

  const callback = (result) => {
    if (isFirstEntry)
      setIsFirstEntry(false);

    if (!result.succeed) {
      setLoading(false);
      setErrorText(result.errorMessage);
      return;
    }

    props.dispatch({type: SET_SELECTED_KTB, ktb: result.result});

    const activeStates = [];

    if (result.result.members)
      result.result.members.forEach(item => {
        activeStates.push({
          id: item.member.id,
          isActive: true,
        });
      });

    setCheckedMode(false);
    setMemberActiveStates(activeStates);
    setLoading(false);
  };

  if (isFirstEntry)
    getktbapi.getktbbyktbid(props.KTB.ktb.id, props.User.email, callback, errorHandler);

  const onEditKTBNameClick = () => {
    setShowEditGroupScreen(true);
  };

  const onCancelClick = () => {
    setCheckedMode(false);
  };

  const onSelectAllClick = (text) => {
    const tmp = [];
    let textTmp = selectAll;

    if (text === selectAll) {
      props.KTB.members.forEach(item => {
        tmp.push({
          id: item.member.id,
        });
      });
      textTmp = unselectAll;
    }

    setSelectedMembers(tmp);
    setSelectAllText(textTmp);
    setForceMemberCheck(text === selectAll);
    setForceMemberUncheck(text === unselectAll);
  };

  const callbackEditGroup = (result) => {
    setLoading(false);

    if (!result.succeed) {
      setErrorText(result.errorMessage);
      return;
    }

    setShowEditGroupScreen(false);
    setKtbName(result.result.name);
  };

  const onEditGroupSaveClick = (value) => {
    setLoading(true);
    updatesinglektbapi.updatesinglektb(props.KTB.ktb.id, props.User.member_id, value, props.User.email, callbackEditGroup, errorHandler);
  };

  const onEditGroupCancelClick = () => {
    setShowEditGroupScreen(false);
  };

  const onMemberStatusChange = (id, status) => {
    if (!memberActiveStates || memberActiveStates.length === 0)
      return;

    const memberState = memberActiveStates.filter(x => x.id === id)[0];
    const memberStates = memberActiveStates.filter(x => x.id !== id);
    memberState.isActive = status;
    memberStates.push(memberState);
    setMemberActiveStates(memberStates);
  };

  const onMemberClick = (id) => {
    const tmp = props.KTB.members.filter((data) => {return data.member.id === id;});

    if (tmp.length === 0)
      return;

    const selectedMember = tmp[0];
    props.dispatch({ type: SET_SELECTED_MEMBER, member: selectedMember });
    props.dispatch({ type: SET_CURRENT_PAGE, page: 'EntryDataAKKScreen' });
    navigation.replace('EntryDataAKKScreen');
  };

  const onMemberLongPress = () => {
    if (!checkedMode)
      setCheckedMode(true);
  };

  const onMemberChecked = (id, checked) => {
    if (!checked && selectedMembers.filter(x => x.id === id).length === 0)
      return;

    if (checked && selectedMembers.filter(x => x.id === id).length > 0)
      return;

    if (!checked) {
      const tmp = selectedMembers.filter(x => x.id !== id);
      setSelectedMembers(tmp);
      setSelectAllText(selectAll);
      return;
    }

    const tmp = [...selectedMembers];
    tmp.push({
      id,
    });

    if (tmp.length === props.KTB.members.length)
      setSelectAllText(unselectAll);

    setSelectedMembers(tmp);
  };

  const addMemberClick = () => {
    props.dispatch({ type: SET_SELECTED_MEMBER, member: null });
    props.dispatch({ type: SET_CURRENT_PAGE, page: 'EntryDataAKKScreen' });
    navigation.replace('EntryDataAKKScreen');
  };

  const addKtbHistoryClick = () => {
    props.dispatch({ type: SET_CURRENT_PAGE, page: 'AddKTBHistoryScreen' });
    navigation.replace('AddKTBHistoryScreen');
  };

  const callbackUpdateMemberStatus = (result) => {
    setLoading(false);

    if (!result.succeed) {
      setErrorText(result.errorMessage);
      return;
    }

    setShowConfirmScreen(false);
    setIsFirstEntry(true);
  };

  const updateMemberConfirmClick = () => {
    const inactiveMembers = [];

    memberActiveStates.forEach(item => {
      if (!item.isActive)
        inactiveMembers.push({
          id: item.id,
        });
    });

    if (inactiveMembers.length === 0)
      return;

    updateaktbstatusapi.updateaktbstatusbylistid(props.KTB.ktb.id, inactiveMembers, props.User.email, callbackUpdateMemberStatus, errorHandler);
  };

  const callbackDeleteMember = (result) => {
    setLoading(false);

    if (!result.succeed) {
      setErrorText(result.errorMessage);
      return;
    }

    setShowConfirmScreen(false);
    setIsFirstEntry(true);
  };

  const deleteMemberConfirmClick = () => {
    if (!selectedMembers || selectedMembers.length === 0)
      return;

    setLoading(true);
    deletememberapi.deletektbmemberbylistid(props.KTB.ktb.id, selectedMembers, props.User.email, callbackDeleteMember, errorHandler);
  };

  const deleteMemberCancelClick = () => {
    setShowConfirmScreen(false);
  };

  const deleteMemberClick = () => {
    setShowConfirmScreen(true);
  };

  const {
    headerStyle,
    headerCancelStyle,
    headerCancelTextStyle,
    headerSelectAllStyle,
    headerSelectAllTextStyle,
    bodyContainerStyle,
    dataSectionStyle,
    headerRightButtonSectionStyle,
    headerRightButtonTextStyle,
    historySectionStyle,
    historyInnerSectionStyle,
    historyInnerTitleSectionStyle,
    historyTextStyle,
    footerSectionStyle,
    footerViewStyle,
    buttonFooterStyle,
    buttonFooterEnableStyle,
    buttonFooterDisableStyle,
    buttonFooterTextStyle,
    buttonFooterTextEnableStyle,
    buttonFooterTextDisableStyle,
    customActivityIndicatorStyle,
  } = ViewDataKTBStyles;

  let disciple = [];

  if (props.KTB && props.KTB.members && props.KTB.members.length > 0 && memberActiveStates.length > 0)
    props.KTB.members.forEach((item) => {
      const status = memberActiveStates.filter(x => x.id === item.member.id)[0].isActive;

      disciple.push(
        (
          <Disciple
            key={item.member.id}
            isCheckedMode={checkedMode}
            forceMemberCheck={forceMemberCheck}
            forceMemberUncheck={forceMemberUncheck}
            member={item}
            isActive={status}
            onMemberActiveClick={(id) => onMemberStatusChange(id, true)}
            onMemberInactiveClick={(id) => onMemberStatusChange(id, false)}
            onMemberClick={onMemberClick}
            onMemberLongPress={onMemberLongPress}
            onMemberChecked={(id, checked) => onMemberChecked(id, checked)}
          />
        )
      );
    });

  const loadingScreen = (
    <View style={customActivityIndicatorStyle}>
      <ActivityIndicator
        animating={loading}
        color={BasicColor}
        size={ProportionateScreenSizeValue(30)}
      />
    </View>
  );

  const headerRightButton = (
    <TouchableOpacity
      style={headerRightButtonSectionStyle}
      onPress={() => onEditKTBNameClick()}
    >
      <Text style={headerRightButtonTextStyle} numberOfLines={1}>Edit</Text>
    </TouchableOpacity>
  );

  const editKTBScreen = (
    <EntryKTBScreen
      onNextClick={(value) => onEditGroupSaveClick(value)}
      onCancelClick={() => onEditGroupCancelClick()}
      mode={KTBEditMode}
      name={props.KTB.ktb.name}
    />
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

  const groupHistory = (
    <View style={historySectionStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View
        style={historyInnerSectionStyle}
      >
        <View
          style={historyInnerTitleSectionStyle}
        >
          <Text
            style={historyTextStyle}
            numberOfLines={1}
          >
            Pertemuan Terakhir
          </Text>
        </View>
        <View
          style={historyInnerTitleSectionStyle}
        >
          <Text
            style={historyTextStyle}
          >
            : {props.KTB.ktb.last_meet_dt ?? '-'}
          </Text>
        </View>
      </View>
      <View
        style={historyInnerSectionStyle}
      >
        <View
          style={historyInnerTitleSectionStyle}
        >
          <Text
            style={historyTextStyle}
          >
            Bahan Terakhir
          </Text>
        </View>
        <View
          style={historyInnerTitleSectionStyle}
        >
          <Text
            style={historyTextStyle}
          >
            : {props.KTB.ktb.last_material_name ?? '-'}
          </Text>
        </View>
      </View>
      <View
        style={historyInnerSectionStyle}
      >
        <View
          style={historyInnerTitleSectionStyle}
        >
          <Text
            style={historyTextStyle}
          >
            Bab Terakhir
          </Text>
        </View>
        <View
          style={historyInnerTitleSectionStyle}
        >
          <Text
            style={historyTextStyle}
          >
            : {props.KTB.ktb.last_material_chapter ?? '-'}
          </Text>
        </View>
      </View>
    </View>
  );

  const errorScreen = (
    <Error
      buttonClick={() => setErrorText('')}
      message={errorText}
    />
  );

  const confirmScreen = (
    <Confirmation
      confirmText={checkedMode ? 'Apakah anda yakin akan menghapus data member?' : 'Apakah anda yakin akan menonaktifkan data member?'}
      firstButtonText="Ya"
      secondButtonText="Tidak"
      mode={AlertMode}
      onFirstButtonClick={checkedMode ? () => deleteMemberConfirmClick() : () => updateMemberConfirmClick()}
      onSecondButtonClick={() => deleteMemberCancelClick()}
    />
  );

  const child = (
    <KeyboardAvoidingView style={bodyContainerStyle}>
      {groupHistory}
      <ScrollView
        keyboardDismissMode="on-drag"
        style={dataSectionStyle}
      >
        {disciple}
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const buttonUpdateEnable = checkedMode ? selectedMembers.length > 0 : memberActiveStates.filter(item => item.isActive === false).length > 0;

  const footer = (
    <View style={footerSectionStyle}>
      <View style={footerViewStyle}>
        <TouchableOpacity
          style={[buttonFooterStyle, buttonFooterEnableStyle]}
          activeOpacity={0.5}
          onPress={() => addMemberClick()}
        >
          <Text style={[buttonFooterTextStyle, buttonFooterTextEnableStyle]} numberOfLines={1}>Tambah</Text>
        </TouchableOpacity>
      </View>
      <View style={footerViewStyle}>
        <TouchableOpacity
          style={[buttonFooterStyle, props.KTB.members ? buttonFooterEnableStyle : buttonFooterDisableStyle]}
          activeOpacity={0.5}
          onPress={() => addKtbHistoryClick()}
          disabled={!props.KTB.members}
        >
          <Text style={[buttonFooterTextStyle, props.KTB.members ? buttonFooterTextEnableStyle : buttonFooterTextDisableStyle]} numberOfLines={1}>History</Text>
        </TouchableOpacity>
      </View>
      <View style={footerViewStyle}>
        <TouchableOpacity
          style={[buttonFooterStyle, buttonUpdateEnable ? buttonFooterEnableStyle : buttonFooterDisableStyle]}
          activeOpacity={0.5}
          onPress={() => deleteMemberClick()}
          disabled={!buttonUpdateEnable}
        >
          <Text style={[buttonFooterTextStyle, buttonUpdateEnable ? buttonFooterTextEnableStyle : buttonFooterTextDisableStyle]} numberOfLines={1}>
            {checkedMode ? 'Hapus' : 'Nonaktif'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <BodyMenuBaseScreen
      title={`Kelompok ${ktbName}`}
      overlayScreen={showEditGroupScreen ? editKTBScreen : null}
      loadingScreen={loading ? loadingScreen : null}
      confirmScreen={showConfirmScreen ? confirmScreen : null}
      errorScreen={(errorText !== '') ? errorScreen : null}
      headerRightButton={headerRightButton}
      customHeader={
        (checkedMode) ? customHeader : undefined
      }
      child={child}
      footer={footer}
      childName="ViewDataKTBScreen"
      navigation={navigation}
      statusBarColor={BackgroundColor}
    />
  );
};

const mapStateToProps = state => {
  const { Page, User, KTB } = state;
  return { Page, User, KTB };
};

export default connect(mapStateToProps)(ViewDataKTBScreen);
