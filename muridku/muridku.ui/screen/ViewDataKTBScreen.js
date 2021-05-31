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
} from 'react-native';
import { connect } from 'react-redux';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import { ViewDataKTBStyles } from '../asset/style-template/ViewDataKTBStyles';
import { BackgroundColor } from '../asset/style-template/MenuBasicStyles';
import { SET_SELECTED_KTB, SET_SELECTED_MEMBER, SET_CURRENT_PAGE } from '../reducer/action/ActionConst';
import EntryKTBScreen, { KTBEditMode } from './EntryKTBScreen';
import Disciple from './component/Disciple';
import Error from './component/Error';

const getktbapi = require('../api/out/getktbbyktbid');

const ViewDataKTBScreen = (props) => {
  const selectAll = 'Select All';
  const unselectAll = 'Unselect All';
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [checkedMode, setCheckedMode] = useState(false);
  const [selectAllText, setSelectAllText] = useState(selectAll);
  const [showEditGroupScreen, setShowEditGroupScreen] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [errorText]);

  const errorHandler = (error) => {
    setErrorText(error.message);
  };

  const callback = (result) => {
    if (!result.succeed)
      setErrorText(result.errorMessage);
    else
      setLoading(false);

    props.dispatch({type: SET_SELECTED_KTB, ktb: result.result});
  };

  if (loading)
    getktbapi.getktbbyktbid(props.KTB.ktb.id, callback, errorHandler);

  const {
    headerStyle,
    headerCancelStyle,
    headerCancelTextStyle,
    headerSelectAllStyle,
    headerSelectAllTextStyle,
    bodyContainerStyle,
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
  } = ViewDataKTBStyles;

  const onEditKTBNameClick = () => {
    setShowEditGroupScreen(true);
  };

  const onCancelClick = () => {
    setCheckedMode(false);
  };

  const onSelectAllClick = (text) => {
    console.log(text);
  };

  const onEditGroupSaveClick = (value) => {
    setShowEditGroupScreen(false);
  };

  const onEditGroupCancelClick = () => {
    setShowEditGroupScreen(false);
  };

  const onMemberClick = (id) => {
    const selectedMembers = props.KTB.members.filter((data) => {return data.member.id === id;});

    if (selectedMembers.length === 0)
      return;

    const selectedMember = selectedMembers[0];
    props.dispatch({ type: SET_SELECTED_MEMBER, member: selectedMember });
    props.dispatch({ type: SET_CURRENT_PAGE, page: 'EntryDataAKKScreen' });
    navigation.replace('EntryDataAKKScreen');
  };

  const onMemberLongPress = () => {
    if (!checkedMode)
      setCheckedMode(true);
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

  const deleteMemberClick = () => {
  };

  let disciple = [];

  if (props.KTB.members.length > 0)
    props.KTB.members.forEach((item) => {
      disciple.push(
        (
          <Disciple
            key={item.member.id}
            isCheckedMode={checkedMode}
            forceMemberCheck={false}
            forceMemberUncheck={false}
            member={item}
            onMemberClick={onMemberClick}
            onMemberLongPress={onMemberLongPress}
          />
        )
      );
    });

  const headerRightButton = (
    <TouchableOpacity
      style={headerRightButtonSectionStyle}
      onPress={() => onEditKTBNameClick()}
    >
      <Text style={headerRightButtonTextStyle}>Edit</Text>
    </TouchableOpacity>
  );

  const editKTBScreen = (
    <EntryKTBScreen
      onNextClick={(value) => onEditGroupSaveClick(value)}
      onCancelClick={() => onEditGroupCancelClick()}
      mode={KTBEditMode}
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

  const child = (
    <KeyboardAvoidingView style={bodyContainerStyle}>
      {groupHistory}
      <ScrollView
        // style={dataSectionStyle}
        // contentContainerStyle={dataContentSectionStyle}
      >
        <View style={[{flexDirection: 'column', flex: 1}]}>
          {disciple}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  const footer = (
    <View style={footerSectionStyle}>
      <View style={footerViewStyle}>
        <TouchableOpacity
          style={[buttonFooterStyle, buttonFooterEnableStyle]}
          activeOpacity={0.5}
          onPress={() => addMemberClick()}
        >
          <Text style={[buttonFooterTextStyle, buttonFooterTextEnableStyle]}>Tambah</Text>
        </TouchableOpacity>
      </View>
      <View style={footerViewStyle}>
        <TouchableOpacity
          style={[buttonFooterStyle, buttonFooterEnableStyle]}
          activeOpacity={0.5}
          onPress={() => addKtbHistoryClick()}
        >
          <Text style={[buttonFooterTextStyle, buttonFooterTextEnableStyle]}>History</Text>
        </TouchableOpacity>
      </View>
      <View style={footerViewStyle}>
        <TouchableOpacity
          style={[buttonFooterStyle, buttonFooterDisableStyle]}
          activeOpacity={0.5}
          onPress={() => deleteMemberClick()}
          disabled={true}
        >
          <Text style={[buttonFooterTextStyle, buttonFooterTextDisableStyle]}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <BodyMenuBaseScreen
      title={`Kelompok ${props.KTB.ktb.name}`}
      overlayScreen={showEditGroupScreen ? editKTBScreen : null}
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
