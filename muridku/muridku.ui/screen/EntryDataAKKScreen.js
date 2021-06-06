/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Text,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import { BasicStyles, BasicColor, PlaceholderTextColor } from '../asset/style-template/BasicStyles';
import { BackgroundColor } from '../asset/style-template/MenuBasicStyles';
import { EntryDataAKKStyles } from '../asset/style-template/EntryDataAKKStyles';
import {
  ProportionateScreenSizeValue,
  DateToString,
} from '../helper/CommonHelper';
import {
  SET_SELECTED_KTB,
} from '../reducer/action/ActionConst';
import Error from './component/Error';
import CustomInputButton from './component/CustomInputButton';
import ModalList from './component/ModalList';
import ModalDatePicker from './component/ModalDatePicker';

const getinactivememberapi = require('../api/out/getallinactivektbmembers');
const getmemberbyidapi = require('../api/out/getmemberbyid');
const getinstitutionapi = require('../api/out/getinstitutionbytype');
const getfacultyapi = require('../api/out/getfacultybyinstitutionid');
const updatememberapi = require('../api/out/updatesinglemember');
const savememberapi = require('../api/out/savesinglemember');
const getktbapi = require('../api/out/getktbbyktbid');

const EntryDataAKKScreen = (props) => {
  const AKK_TYPE_NONE = 'NONE';
  const AKK_TYPE_SCHOOL = 'SCH';
  const AKK_TYPE_COLLEGE = 'CLG';
  const AKK_TYPE_ALUMNI = 'ALM';
  const AKK_TYPE_ALL = 'ALL';
  const enabledBackgroundColor = '#FFF';
  const disabledBackgroundColor = '#EFEFEF';
  const isUpdate = props.Member ? true : false;
  let member;
  let user;
  let institution;
  let faculty;

  if (props.Member) {
    member = props.Member.member;
    user = props.Member.user;
    institution = props.Member.institution;
    faculty = props.Member.faculty;
  }
  const { navigation } = props;
  const [firstEntry, setFirstEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedAKKType, setSelectedAKKType] = useState(member && member.inst_type ? member.inst_type : AKK_TYPE_NONE);
  const [isEnabled, setIsEnabled] = useState(member && member.inst_type ? true : false);
  const [name, setName] = useState(member ? member.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [address, setAddress] = useState(member && member.address ? member.address : '');
  const [birthDt, setBirthDt] = useState(member && member.birth_dt ? new Date(member.birth_dt) : null);
  const [birthPlace, setBirthPlace] = useState(member && member.birth_place ? member.birth_place : '');
  const [mobilePhn, setMobilePhn] = useState(member && member.mobile_phn ? member.mobile_phn : '');
  const [institutionId, setInstitutionId] = useState(institution ? institution.id : null);
  const [institutionName, setInstitutionName] = useState(institution ? institution.name : '');
  const [facultyId, setFacultyId] = useState(faculty ? faculty.id : null);
  const [facultyName, setFacultyName] = useState(faculty ? faculty.name : '');
  const [errorText, setErrorText] = useState('');
  const [inactiveMembers, setInactiveMembers] = useState([]);
  const [selectedInactiveMemberId, setSelectedInactiveMemberId] = useState(null);
  const [nameOpen, setNameOpen] = useState(false);
  const [birthDtPickerOpen, setBirthDtPickerOpen] = useState(false);
  const [instListOpen, setInstListOpen] = useState(false);
  const [facListOpen, setFacListOpen] = useState(false);
  const [institutionList, setInstitutionList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    if (!firstEntry)
      return;

    if (firstEntry && selectedAKKType === AKK_TYPE_NONE) {
      setFirstEntry(false);
      return;
    }

    getinstitutionapi.getinstitutionbytype(selectedAKKType === AKK_TYPE_ALUMNI ? AKK_TYPE_ALL : selectedAKKType, props.User.email, callbackInstitution, errorHandler);
  }, [firstEntry, selectedAKKType]);

  const errorHandler = (error) => {
    setLoading(false);
    setErrorText(error.message);
  };

  const callbackNameOpen = (result, openValue) => {
    setLoading(false);

    if (!result.succeed) {
      setErrorText(result.errorMessage);
      return;
    }

    setInactiveMembers(result.result);
    setNameOpen(openValue);
  };

  const onNameOpen = (value) => {
    if (!value)
      return;

    setLoading(true);
    getinactivememberapi.getallinactivektbmembers(props.User.email, (result) => callbackNameOpen(result, value), errorHandler);
  };

  const callbackOnNameChange = (result) => {
    if (!result.succeed) {
      setLoading(false);
      setErrorText(result.errorMessage);
      return;
    }

    const mbr = result.result;
    console.log(mbr);
    setName(mbr.member.name);
    setEmail(mbr.user.email);
    setAddress(mbr.member.address ? mbr.member.address : '');
    setBirthPlace(mbr.member.birth_place ? mbr.member.birth_place : '');
    setBirthDt(mbr.birthDt ? new Date(mbr.member.birthDt) : null);
    setMobilePhn(mbr.member.mobile_phn ? mbr.member.mobile_phn : '');
    onInstitutionChange(mbr.institution ? mbr.institution.id : null, mbr.institution ? mbr.institution.name : '');
    onFacultyChange(mbr.faculty ? mbr.faculty.id : null, mbr.faculty ? mbr.faculty.name : '');
    onNameClose();
    setLoading(false);
  };

  const onNameChange = (id, memberName) => {
    setLoading(true);
    setSelectedInactiveMemberId(id);
    setName(memberName);


    if (id && id !== selectedInactiveMemberId)
      getmemberbyidapi.getmemberbyid(id, props.User.email, callbackOnNameChange, errorHandler);
    else {
      if (!id) {
        setName('');
        setEmail('');
        setAddress('');
        setBirthPlace('');
        setBirthDt(null);
        setMobilePhn('');
        onInstitutionChange(null, '');
      }

      setLoading(false);
      setNameOpen(false);
    }
  };

  const onNameClose = () => {
    setNameOpen(false);
  };

  const onManualNameChange = (value) => {
    setSelectedInactiveMemberId(null);
    setName(value);
  };

  const onBirthDtPickerOpen = (value) => {
    setBirthDtPickerOpen(value);
  };

  const onBirthDtPickerSelect = (value) => {
    setBirthDt(value);
    onBirthDtPickerClose();
  };

  const onBirthDtPickerClose = () => {
    setBirthDtPickerOpen(false);
  };

  const callbackFaculty = (result) => {
    if (!result.succeed) {
      setLoading(false);
      setFacultyList([]);
      return;
    }

    const facList = result.result;

    facList.forEach(element => {
      element.value = element.id;
      element.label = element.name;
    });

    setFacultyList(facList);

    if (instListOpen)
      onInstClose();

    setLoading(false);
  };

  const onInstitutionChange = (id, instName) => {
    setLoading(true);
    setInstitutionId(id);
    setInstitutionName(instName);

    if (id && id !== institutionId) {
      setFacultyId(null);
      setFacultyName('');
      getfacultyapi.getfacultybyinstitutionid(id, props.User.email, callbackFaculty, errorHandler);
    }
    else {
      if (!id) {
        setFacultyId(null);
        setFacultyName('');
        setFacultyList([]);
      }

      setLoading(false);
    }
  };

  const onFacultyChange = (id, facName) => {
    setFacultyId(id);
    setFacultyName(facName);
    onFacClose();
  };

  const callbackInstitution = (result) => {
    if (!result.succeed) {
      setLoading(false);
      setInstitutionList([]);
      setFacultyList([]);
      return;
    }

    const instList = result.result;

    instList.forEach(element => {
      element.value = element.id;
      element.label = element.name;
    });

    setInstitutionList(instList);
    setLoading(false);

    if (institutionId)
      getfacultyapi.getfacultybyinstitutionid(institutionId, props.User.email, callbackFaculty, errorHandler);
  };

  const onSelectAKKType = (akkType) => {
    if (akkType === selectedAKKType)
      return;

    setLoading(true);
    setSelectedAKKType(akkType);
    setIsEnabled(akkType !== AKK_TYPE_NONE);
    setInstitutionId(null);
    setInstitutionName('');
    setFacultyId(null);
    setFacultyName('');

    getinstitutionapi.getinstitutionbytype(akkType === AKK_TYPE_ALUMNI ? AKK_TYPE_ALL : akkType, props.User.email, callbackInstitution, errorHandler);
  };

  const onInstOpen = (value) => {
    if (institutionList.length === 0) {
      if (instListOpen)
      setInstListOpen(false);

      return;
    }

    setInstListOpen(value);
  };

  const onInstClose = () => {
    setInstListOpen(false);
  };

  const onFacOpen = (value) => {
    if (facultyList.length === 0) {
      if (facListOpen)
        setFacListOpen(false);

      return;
    }

    setFacListOpen(value);
  };

  const onFacClose = () => {
    setFacListOpen(false);
  };

  const callbackRefreshKtb = (result) => {
    setLoading(false);

    if (!result.succeed) {
      setErrorText(result.errorMessage);
      return;
    }

    props.dispatch({type: SET_SELECTED_KTB, ktb: result.result});
    navigation.replace('ViewDataKTBScreen');
  };

  const callbackSaveMember = (result) => {
    if (!result.succeed) {
      setLoading(false);
      setErrorText(result.errorMessage);
      return;
    }

    getktbapi.getktbbyktbid(props.KTB.ktb.id, props.User.email, callbackRefreshKtb, errorHandler);
  };

  const onSubmitClick = () => {
    if (email === '') {
      setErrorText('email belum diisi.');
      return;
    }
    if (name === '') {
      setErrorText('nama belum diisi.');
      return;
    }
    if (address === '') {
      setErrorText('alamat belum diisi.');
      return;
    }

    setLoading(true);
    let birthDtStr = null;

    if (birthDt) {
      const birthMonth = birthDt.getMonth() + 1 < 10 ? `0${birthDt.getMonth() + 1}` : (birthDt.getMonth() + 1).toString();
      const birthDay = birthDt.getDate()  < 10 ? `0${birthDt.getDate()}` : (birthDt.getDate()).toString();
      birthDtStr = `${birthDt.getFullYear()}-${birthMonth}-${birthDay}`;
    }

    if (isUpdate) {
      updatememberapi.updatesinglemember(
        email,
        member.id,
        name,
        address,
        birthDtStr,
        birthPlace,
        mobilePhn,
        selectedAKKType,
        institutionId,
        facultyId,
        props.User.email,
        callbackSaveMember,
        errorHandler
      );

      return;
    }

    savememberapi.savesinglemember(
      props.KTB.ktb.id,
      selectedInactiveMemberId,
      email,
      name,
      address,
      birthDtStr,
      birthPlace,
      mobilePhn,
      selectedAKKType,
      institutionId,
      facultyId,
      props.User.email,
      callbackSaveMember,
      errorHandler
    );
  };

  const {
    globalFontStyle,
    inputStyle,
  } = BasicStyles;

  const {
    bodyContainerStyle,
    welcomingSectionStyle,
    welcomingTextStyle,
    accTypeSectionStyle,
    accTypeTextStyle,
    instSectionStyle,
    instButtonStyle,
    buttonStyle,
    buttonUnselectedStyle,
    nameButtonTextStyle,
    nameButtonUselectedTextStyle,
    formSectionStyle,
    formBodySectionStyle,
    formStyle,
    dropdownInputContainerStyle,
    dropdownInputStyle,
    dropdownResetButtonContainerStyle,
    dropdownResetButtonStyle,
    dropdownResetButtonTextStyle,
    dropdownButtonContainerStyle,
    dropdownButtonStyle,
    dropdownListMainSectionStyle,
    dropdownListViewSectionStyle,
    dropdownListViewItemSectionStyle,
    dropdownListViewItemTextSectionStyle,
    dropdownListViewItemTextStyle,
    dropdownListButtonSectionStyle,
    dropdownListButtonStyle,
    dropdownListButtonContentStyle,
    dropdownListButtonSelectStyle,
    dropdownListButtonCancelStyle,
    dropdownListButtonTextStyle,
    dropdownListButtonSelectTextStyle,
    dropdownListButtonCancelTextStyle,
    customActivityIndicatorStyle,
    footerViewStyle,
    buttonFooterStyle,
    submitButtonTextStyle,
  } = EntryDataAKKStyles;

  const minBirthDtYear = new Date().getFullYear() - 90;
  const maxBirthDtYear = new Date().getFullYear();
  const minBirthDtMonth = 1;
  const maxBirthDtMonth = new Date().getMonth() + 1;
  const minBirthDtDay = 1;
  const maxBirthDtDay = new Date().getDate();
  const minDtStr = `${minBirthDtYear}-${minBirthDtMonth < 10 ? '0' : ''}${minBirthDtMonth}-${minBirthDtDay < 10 ? '0' : ''}${minBirthDtDay}`;
  const maxDtStr = `${maxBirthDtYear}-${maxBirthDtMonth < 10 ? '0' : ''}${maxBirthDtMonth}-${maxBirthDtDay < 10 ? '0' : ''}${maxBirthDtDay}`;
  const minDt = new Date(minDtStr);
  const maxDt = new Date(maxDtStr);

  const modalNameData = [];

  if (nameOpen)
    inactiveMembers.forEach(item => {
      modalNameData.push({
        id: item.id,
        name: item.name,
      });
    });

  const modalInstData = [];

  if (instListOpen)
    institutionList.forEach(item => {
      modalInstData.push({
        id: item.id,
        name: item.name,
      });
    });

  const modalFacData = [];

  if (facListOpen)
    facultyList.forEach(item => {
      modalFacData.push({
        id: item.id,
        name: item.name,
      });
    });

  let modalScreen = null;

  if ((nameOpen && modalNameData.length > 0) || (instListOpen && modalInstData.length > 0) || (facListOpen && modalFacData.length > 0))
    modalScreen = (
      <ModalList
        selectedId={nameOpen ? selectedInactiveMemberId : (instListOpen ? institutionId : facultyId)}
        selectedName={nameOpen ? name : (instListOpen ? institutionName : facultyName)}
        mainSectionStyle={dropdownListMainSectionStyle}
        listSectionStyle={dropdownListViewSectionStyle}
        listItemSectionStyle={dropdownListViewItemSectionStyle}
        listItemTextSectionStyle={dropdownListViewItemTextSectionStyle}
        listItemTextStyle={dropdownListViewItemTextStyle}
        buttonSectionStyle={dropdownListButtonSectionStyle}
        buttonStyle={dropdownListButtonStyle}
        selectButtonStyle={[dropdownListButtonContentStyle, dropdownListButtonSelectStyle]}
        cancelButtonStyle={[dropdownListButtonContentStyle, dropdownListButtonCancelStyle]}
        selectTextStyle={[globalFontStyle, dropdownListButtonTextStyle, dropdownListButtonSelectTextStyle]}
        cancelTextStyle={[globalFontStyle, dropdownListButtonTextStyle, dropdownListButtonCancelTextStyle]}
        list={nameOpen ? modalNameData : (instListOpen ? modalInstData : modalFacData)}
        onCancelClick={nameOpen ? onNameClose : (instListOpen ? onInstClose : onFacClose)}
        onSelectClick={nameOpen ? onNameChange : (instListOpen ? onInstitutionChange : onFacultyChange)}
      />
    );

  if (birthDtPickerOpen)
    modalScreen = (
      <ModalDatePicker
        selectedDate={birthDt}
        minDt={minDt}
        maxDt={maxDt}
        mode="date"
        onSelectClick={onBirthDtPickerSelect}
        onCancelClick={onBirthDtPickerClose}
        mainSectionStyle={dropdownListMainSectionStyle}
        dateSectionStyle={dropdownListViewSectionStyle}
        buttonSectionStyle={dropdownListButtonSectionStyle}
        buttonStyle={dropdownListButtonStyle}
        selectButtonStyle={[dropdownListButtonContentStyle, dropdownListButtonSelectStyle]}
        cancelButtonStyle={[dropdownListButtonContentStyle, dropdownListButtonCancelStyle]}
        selectTextStyle={[globalFontStyle, dropdownListButtonTextStyle, dropdownListButtonSelectTextStyle]}
        cancelTextStyle={[globalFontStyle, dropdownListButtonTextStyle, dropdownListButtonCancelTextStyle]}
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

  const child = (
    <KeyboardAvoidingView
      style={bodyContainerStyle}
      behavior="position"
    >
      <View style={welcomingSectionStyle}>
        <Text style={[globalFontStyle, welcomingTextStyle]} numberOfLines={1}>
          {isUpdate ? 'Update' : 'Create'}
        </Text>
        <View style={accTypeSectionStyle}>
          <Text style={[globalFontStyle, accTypeTextStyle]} numberOfLines={1}>
            Pilih Tipe Institusi AKK
          </Text>
        </View>
        <View style={instSectionStyle}>
          <View style={instButtonStyle}>
            <TouchableOpacity
              style={selectedAKKType === AKK_TYPE_SCHOOL ? buttonStyle : buttonUnselectedStyle}
              activeOpacity={0.5}
              onPress={() => onSelectAKKType(AKK_TYPE_SCHOOL)}
            >
              <Text style={[globalFontStyle, selectedAKKType === AKK_TYPE_SCHOOL ? nameButtonTextStyle : nameButtonUselectedTextStyle]} numberOfLines={1}>
                Siswa
              </Text>
            </TouchableOpacity>
          </View>
          <View style={instButtonStyle}>
            <TouchableOpacity
              style={selectedAKKType === AKK_TYPE_COLLEGE ? buttonStyle : buttonUnselectedStyle}
              activeOpacity={0.5}
              onPress={() => onSelectAKKType(AKK_TYPE_COLLEGE)}
            >
              <Text style={[globalFontStyle, selectedAKKType === AKK_TYPE_COLLEGE ? nameButtonTextStyle : nameButtonUselectedTextStyle]} numberOfLines={1}>
                Mahasiswa
              </Text>
            </TouchableOpacity>
          </View>
          <View style={instButtonStyle}>
            <TouchableOpacity
              style={selectedAKKType === AKK_TYPE_ALUMNI ? buttonStyle : buttonUnselectedStyle}
              activeOpacity={0.5}
              onPress={() => onSelectAKKType(AKK_TYPE_ALUMNI)}
            >
              <Text style={[globalFontStyle, selectedAKKType === AKK_TYPE_ALUMNI ? nameButtonTextStyle : nameButtonUselectedTextStyle]} numberOfLines={1}>
                Alumni
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={[formSectionStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
        behavior="position"
      >
        <View style={formBodySectionStyle}>
          {
            (isUpdate) ?
            (
              <TextInput style={[globalFontStyle, inputStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
                placeholder="Nama Lengkap"
                placeholderTextColor={PlaceholderTextColor}
                value={name}
                onChangeText={(value) => setName(value)}
                onSubmitEditing={Keyboard.dismiss}
                editable={isEnabled}
                disabled={!isEnabled}
              />
            ) : (
              <CustomInputButton
                inputContainerStyle={[dropdownInputContainerStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
                inputStyle={[globalFontStyle, dropdownInputStyle]}
                resetContainerStyle={dropdownResetButtonContainerStyle}
                resetButtonStyle={dropdownResetButtonStyle}
                resetButtonTextStyle={dropdownResetButtonTextStyle}
                buttonContainerStyle={dropdownButtonContainerStyle}
                buttonStyle={dropdownButtonStyle}
                buttonText="CARI"
                disabled={(!isEnabled)}
                placeholder="Nama Lengkap"
                placeholderTextColor={PlaceholderTextColor}
                enableTextInput={isEnabled}
                onInputButtonClick={(value) => onNameOpen(value)}
                onChangeText={(value) => onManualNameChange(value)}
                onDeleteButtonClick={() => onNameChange(null, '')}
                value={name}
              />
            )
          }
        </View>
        <View style={formBodySectionStyle}>
          <TextInput style={[globalFontStyle, inputStyle, formStyle, {
              backgroundColor: !(!isEnabled || (user && user.is_active === 1)) ? enabledBackgroundColor : disabledBackgroundColor,
            }]}
            placeholder="Email"
            placeholderTextColor={PlaceholderTextColor}
            value={email}
            editable={(isEnabled && (!user || user.is_active === 0))}
            disabled={(!isEnabled || (user && user.is_active === 1))}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        <View style={formBodySectionStyle}>
          <TextInput style={[globalFontStyle, inputStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
            placeholder="Alamat"
            placeholderTextColor={PlaceholderTextColor}
            value={address}
            onChangeText={(value) => setAddress(value)}
            editable={isEnabled}
            disabled={!isEnabled}
          />
        </View>
        <View style={formBodySectionStyle}>
          <TextInput style={[globalFontStyle, inputStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
            placeholder="No. Handphone"
            placeholderTextColor={PlaceholderTextColor}
            value={mobilePhn}
            onChangeText={(value) => setMobilePhn(value)}
            editable={isEnabled}
            disabled={!isEnabled}
          />
        </View>
        <View style={formBodySectionStyle}>
          <TextInput style={[globalFontStyle, inputStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
            placeholder="Tempat Lahir"
            placeholderTextColor={PlaceholderTextColor}
            value={birthPlace}
            onChangeText={(value) => setBirthPlace(value)}
            editable={isEnabled}
            disabled={!isEnabled}
          />
        </View>
        <View style={formBodySectionStyle}>
          <CustomInputButton
            inputContainerStyle={[dropdownInputContainerStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
            inputStyle={[globalFontStyle, dropdownInputStyle]}
            resetContainerStyle={dropdownResetButtonContainerStyle}
            resetButtonStyle={dropdownResetButtonStyle}
            resetButtonTextStyle={dropdownResetButtonTextStyle}
            buttonContainerStyle={dropdownButtonContainerStyle}
            buttonStyle={dropdownButtonStyle}
            buttonText="PILIH"
            disabled={(!isEnabled)}
            placeholder="Tanggal Lahir (dd-MM-yyyy)"
            placeholderTextColor={PlaceholderTextColor}
            onInputButtonClick={(value) => onBirthDtPickerOpen(value)}
            onDeleteButtonClick={() => onBirthDtPickerSelect(null)}
            value={DateToString(birthDt) ?? ''}
          />
        </View>
        <View style={formBodySectionStyle}>
          <CustomInputButton
            inputContainerStyle={[dropdownInputContainerStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
            inputStyle={[globalFontStyle, dropdownInputStyle]}
            resetContainerStyle={dropdownResetButtonContainerStyle}
            resetButtonStyle={dropdownResetButtonStyle}
            resetButtonTextStyle={dropdownResetButtonTextStyle}
            buttonContainerStyle={dropdownButtonContainerStyle}
            buttonStyle={dropdownButtonStyle}
            buttonText="CARI"
            disabled={(!isEnabled)}
            placeholder="Institusi"
            placeholderTextColor={PlaceholderTextColor}
            showList={instListOpen}
            onInputButtonClick={(value) => onInstOpen(value)}
            onDeleteButtonClick={() => onInstitutionChange(null, '')}
            value={institutionName}
          />
        </View>
        <View style={formBodySectionStyle}>
          <CustomInputButton
            inputContainerStyle={[dropdownInputContainerStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
            inputStyle={[globalFontStyle, dropdownInputStyle]}
            resetContainerStyle={dropdownResetButtonContainerStyle}
            resetButtonStyle={dropdownResetButtonStyle}
            resetButtonTextStyle={dropdownResetButtonTextStyle}
            buttonContainerStyle={dropdownButtonContainerStyle}
            buttonStyle={dropdownButtonStyle}
            buttonText="CARI"
            disabled={(!isEnabled)}
            placeholder="Fakultas"
            placeholderTextColor={PlaceholderTextColor}
            showList={facListOpen}
            onInputButtonClick={(value) => onFacOpen(value)}
            onDeleteButtonClick={() => onFacultyChange(null, '')}
            value={facultyName}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );

  const errorScreen = (
    <Error
      buttonClick={() => setErrorText('')}
      message={errorText}
    />
  );

  const footer = (
    <KeyboardAvoidingView style={footerViewStyle}>
      <TouchableOpacity
        style={buttonFooterStyle}
        activeOpacity={0.5}
        onPress={() => onSubmitClick()}
      >
        <Text style={[globalFontStyle, submitButtonTextStyle]} numberOfLines={1}>Save</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );

  return (
    <BodyMenuBaseScreen
      overlayScreen={modalScreen}
      loadingScreen={loading ? loadingScreen : null}
      title="Data AKK"
      child={child}
      footer={footer}
      errorScreen={errorText !== '' ? errorScreen : null}
      childName="EntryDataAKKScreen"
      navigation={navigation}
      statusBarColor={BackgroundColor}
    />
  );
};

const mapStateToProps = state => {
  const { Page, User, KTB, Member } = state;
  return { Page, User, KTB, Member };
};

export default connect(mapStateToProps)(EntryDataAKKScreen);
