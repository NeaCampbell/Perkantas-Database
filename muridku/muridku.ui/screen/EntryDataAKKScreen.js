/* eslint-disable prettier/prettier */
/* eslint-disable curly */
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
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import { BasicStyles, BasicColor, PlaceholderTextColor } from '../asset/style-template/BasicStyles';
import { BackgroundColor } from '../asset/style-template/MenuBasicStyles';
import { DataAKKStyles } from '../asset/style-template/DataAKKStyles';
import {
  ProportionateScreenSizeValue,
} from '../helper/CommonHelper';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  SET_SELECTED_KTB,
} from '../reducer/action/ActionConst';
import Error from './component/Error';

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
  const [loading, setLoading] = useState(false);
  const [selectedAKKType, setSelectedAKKType] = useState(institution ? institution.type : AKK_TYPE_NONE);
  const [isEnabled, setIsEnabled] = useState(selectedAKKType !== AKK_TYPE_NONE);
  const [name, setName] = useState(member ? member.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [address, setAddress] = useState(member && member.address ? member.address : '');
  const [birthDt, setBirthDt] = useState(member && member.birth_dt ? member.birth_dt : new Date());
  const [isBirthDtSet, setIsBirthDtSet] = useState(false);
  const [birthPlace, setBirthPlace] = useState(member && member.birth_place ? member.birth_place : '');
  const [mobilePhn, setMobilePhn] = useState(member && member.mobile_phn ? member.mobile_phn : '');
  const [institutionId, setInstitutionId] = useState(institution ? institution.id : null);
  const [facultyId, setFacultyId] = useState(faculty ? faculty.id : null);
  const [errorText, setErrorText] = useState('');
  const [instListOpen, setInstListOpen] = useState(false);
  const [facListOpen, setFacListOpen] = useState(false);
  const [institutionList, setInstitutionList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);

  const errorHandler = (error) => {
    setLoading(false);
    setErrorText(error.message);
  };

  const callbackFaculty = (result) => {
    if (loading)
      setLoading(false);

    if (!result.succeed)
      return;

    const facList = result.result;

    facList.forEach(element => {
      element.value = element.id;
      element.label = element.name;
    });

    setFacultyList(facList);
  };

  const onInstitutionChange = (value) => {
    getfacultyapi.getfacultybyinstitutionid(value, callbackFaculty, errorHandler);
  };

  const callbackInstitution = (result) => {
    setLoading(false);

    if (!result.succeed)
      return;

    const instList = result.result;

    instList.forEach(element => {
      element.value = element.id;
      element.label = element.name;
    });

    setInstitutionList(instList);
  };

  const onSelectAKKType = (akkType) => {
    setLoading(true);
    setSelectedAKKType(akkType);
    setIsEnabled(akkType !== AKK_TYPE_NONE);
    getinstitutionapi.getinstitutionbytype(akkType, callbackInstitution, errorHandler);

    if (akkType !== AKK_TYPE_COLLEGE) {
      setFacultyId(null);
      setFacListOpen(false);
    }
  };

  const resetDropdownList = () => {
    setFacListOpen(false);
    setInstListOpen(false);
  };

  const onInstOpen = () => {
    setFacListOpen(false);
    setInstListOpen(true);
  };

  const onFacOpen = () => {
    setInstListOpen(false);
    setFacListOpen(true);
  };

  const onTextFocus = () => {
    resetDropdownList();
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

    getktbapi.getktbbyktbid(props.KTB.ktb.id, callbackRefreshKtb, errorHandler);
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

    if (isUpdate) {
      updatememberapi.updatesinglemember(
        email,
        member.id,
        name,
        address,
        isBirthDtSet ? birthDt : null,
        birthPlace,
        mobilePhn,
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
      email,
      name,
      address,
      birthDt,
      birthPlace,
      mobilePhn,
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
    dropDownContainerStyle,
    dropDownPlaceholderStyle,
    dropDownItemStyle,
    dropDownSearchContainerStyle,
    dropDownSearchInputStyle,
    customActivityIndicatorStyle,
    footerViewStyle,
    buttonFooterStyle,
    submitButtonTextStyle,
  } = DataAKKStyles;

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

  const child = (
    <View style={bodyContainerStyle}>
      <View style={welcomingSectionStyle}>
        <Text style={[globalFontStyle, welcomingTextStyle]}>
          {isUpdate ? 'Update' : 'Create'}
        </Text>
        <Text style={[globalFontStyle, accTypeTextStyle]}>
          Pilih Tipe Institusi AKK
        </Text>
        <View style={instSectionStyle}>
          <View style={instButtonStyle}>
            <TouchableOpacity
              style={selectedAKKType === AKK_TYPE_SCHOOL ? buttonStyle : buttonUnselectedStyle}
              activeOpacity={0.5}
              onPress={() => {
                resetDropdownList();
                onSelectAKKType(AKK_TYPE_SCHOOL);
              }}
            >
              <Text style={[globalFontStyle, selectedAKKType === AKK_TYPE_SCHOOL ? nameButtonTextStyle : nameButtonUselectedTextStyle]}>
                Siswa
              </Text>
            </TouchableOpacity>
          </View>
          <View style={instButtonStyle}>
            <TouchableOpacity
              style={selectedAKKType === AKK_TYPE_COLLEGE ? buttonStyle : buttonUnselectedStyle}
              activeOpacity={0.5}
              onPress={() => {
                resetDropdownList();
                onSelectAKKType(AKK_TYPE_COLLEGE);
              }}
            >
              <Text style={[globalFontStyle, selectedAKKType === AKK_TYPE_COLLEGE ? nameButtonTextStyle : nameButtonUselectedTextStyle]}>
                Mahasiswa
              </Text>
            </TouchableOpacity>
          </View>
          <View style={instButtonStyle}>
            <TouchableOpacity
              style={selectedAKKType === AKK_TYPE_ALUMNI ? buttonStyle : buttonUnselectedStyle}
              activeOpacity={0.5}
              onPress={() => {
                resetDropdownList();
                onSelectAKKType(AKK_TYPE_ALUMNI);
              }}
            >
              <Text style={[globalFontStyle, selectedAKKType === AKK_TYPE_ALUMNI ? nameButtonTextStyle : nameButtonUselectedTextStyle]}>
                Alumni
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        style={[formSectionStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <View
          style={formBodySectionStyle}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TextInput style={[globalFontStyle, inputStyle, formStyle, {
              backgroundColor: !(!isEnabled || (user && user.is_active === 1) || isUpdate) ? enabledBackgroundColor : disabledBackgroundColor,
            }]}
            placeholder="Email"
            placeholderTextColor={PlaceholderTextColor}
            value={email}
            disabled={(!isEnabled || (user && user.is_active === 1) || isUpdate)}
            onChangeText={(value) => setEmail(value)}
            onFocus={() => onTextFocus()}
          />
        </View>
        <View
          style={formBodySectionStyle}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TextInput style={[globalFontStyle, inputStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
            placeholder="Nama Lengkap"
            placeholderTextColor={PlaceholderTextColor}
            value={name}
            onChangeText={(value) => setName(value)}
            onSubmitEditing={Keyboard.dismiss}
            onFocus={() => onTextFocus()}
            disabled={!isEnabled}
          />
        </View>
        <View
          style={formBodySectionStyle}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TextInput style={[globalFontStyle, inputStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
            placeholder="Alamat"
            placeholderTextColor={PlaceholderTextColor}
            value={address}
            onChangeText={(value) => setAddress(value)}
            onFocus={() => onTextFocus()}
            disabled={!isEnabled}
          />
        </View>
        <View
          style={formBodySectionStyle}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TextInput style={[globalFontStyle, inputStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
            placeholder="No. Handphone"
            placeholderTextColor={PlaceholderTextColor}
            value={mobilePhn}
            onChangeText={(value) => setMobilePhn(value)}
            onFocus={() => onTextFocus()}
            disabled={!isEnabled}
          />
        </View>
        <View
          style={formBodySectionStyle}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TextInput style={[globalFontStyle, inputStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
            placeholder="Tempat Lahir"
            placeholderTextColor={PlaceholderTextColor}
            value={birthPlace}
            onChangeText={(value) => setBirthPlace(value)}
            onFocus={() => onTextFocus()}
            disabled={!isEnabled}
          />
        </View>
        <View
          style={formBodySectionStyle}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* <TextInput style={[globalFontStyle, inputStyle, formStyle]}
            placeholder="Tanggal Lahir"
            placeholderTextColor={PlaceholderTextColor}
            onFocus={() => onTextFocus()}
          /> */}
          {/* <DateTimePicker
            testID="dateTimePicker"
            value={birthDt}
            minimumDate={minDt}
            maximumDate={maxDt}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              setIsBirthDtSet(true);
              setBirthDt(selectedDate || new Date());
            }}
            disabled={!isEnabled}
          /> */}
        </View>
        <View
          style={formBodySectionStyle}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <DropDownPicker
            defaultNull
            searchable={true}
            searchPlaceholder="Cari Institusi..."
            searchContainerStyle={dropDownSearchContainerStyle}
            searchTextinputStyle={[globalFontStyle, dropDownSearchInputStyle]}
            searchPlaceholderTextColor={PlaceholderTextColor}
            placeholder="Institusi"
            containerStyle={[inputStyle, dropDownContainerStyle]}
            style={[globalFontStyle, inputStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
            placeholderStyle={[globalFontStyle, dropDownPlaceholderStyle]}
            dropDownContainerStyle={dropDownContainerStyle}
            listItemLabelStyle={[globalFontStyle, dropDownItemStyle]}
            open={instListOpen}
            setOpen={onInstOpen}
            closeAfterSelecting={true}
            items={institutionList}
            setItems={setInstitutionList}
            zIndex={99}
            zIndexInverse={199}
            value={institutionId}
            setValue={setInstitutionId}
            onChangeValue={(value) => onInstitutionChange(value)}
            disabled={!isEnabled}
          />
        </View>
        <View
          style={formBodySectionStyle}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <DropDownPicker
            defaultNull
            disabled={selectedAKKType !== AKK_TYPE_COLLEGE || facultyId === 0 && !isEnabled}
            searchable={true}
            searchPlaceholder="Cari Fakultas..."
            searchContainerStyle={dropDownSearchContainerStyle}
            searchTextinputStyle={[globalFontStyle, dropDownSearchInputStyle]}
            searchPlaceholderTextColor={PlaceholderTextColor}
            placeholder="Fakultas"
            containerStyle={[inputStyle, dropDownContainerStyle]}
            style={[globalFontStyle, inputStyle, formStyle, {backgroundColor: isEnabled ? enabledBackgroundColor : disabledBackgroundColor}]}
            placeholderStyle={[globalFontStyle, dropDownPlaceholderStyle]}
            dropDownContainerStyle={dropDownContainerStyle}
            listItemLabelStyle={[globalFontStyle, dropDownItemStyle]}
            open={facListOpen}
            setOpen={onFacOpen}
            items={facultyList}
            setItems={setFacultyList}
            zIndex={199}
            zIndexInverse={99}
            value={facultyId}
            setValue={setFacultyId}
          />
        </View>
      </ScrollView>
      {
      (loading) ?
        (<View style={customActivityIndicatorStyle}>
          <ActivityIndicator
            animating={loading}
            color={BasicColor}
            size={ProportionateScreenSizeValue(ProportionateScreenSizeValue(30))}
          />
        </View>) : null
      }
    </View>
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
        onFocus={() => onTextFocus()}
        onPress={() => onSubmitClick()}
      >
        <Text style={[globalFontStyle, submitButtonTextStyle]}>Save</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );

  return (
    <BodyMenuBaseScreen
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
