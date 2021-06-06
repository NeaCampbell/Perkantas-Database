/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import { BasicStyles, PlaceholderTextColor, BasicColor } from '../asset/style-template/BasicStyles';
import { AddKTBHistoryStyles } from '../asset/style-template/AddKTBHistoryStyles';
import { AddKTBHistoryDateStyles } from '../asset/style-template/AddKTBHistoryDateStyles';
import { AddKTBHistoryAKKStyles } from '../asset/style-template/AddKTBHistoryAKKStyles';
import { AddKTBHistoryMaterialStyles } from '../asset/style-template/AddKTBHistoryMaterialStyles';
import { BackgroundColor } from '../asset/style-template/MenuBasicStyles';
import {
  ProportionateScreenSizeValue,
  DateToStringWithDay,
  ListToString,
} from '../helper/CommonHelper';
import DiscipleShort from './component/DiscipleShort';
import Error from './component/Error';
import DatePicker from 'react-native-date-picker';
import CustomInputButton from './component/CustomInputButton';
import ModalList from './component/ModalList';

const getallmaterialsapi = require('../api/out/getallmaterials');

const AddKTBHistoryScreen = (props) => {
  const { navigation } = props;
  const sectionDate = 'DATE';
  const sectionAKK = 'AKK';
  const sectionMaterial = 'MTRL';
  const sectionViewHistory = 'VIEW';
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState(sectionDate);
  const [errorText, setErrorText] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAKK, setSelectedAKK] = useState([]);
  const [selectedAKKText, setSelectedAKKText] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [materialOpen, setMaterialOpen] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [selectedMaterialName, setSelectedMaterialName] = useState(null);
  const [selectedMaterialChapter, setSelectedMaterialChapter] = useState(null);
  const { globalFontStyle } = BasicStyles;

  useEffect(() => {
    if (selectedAKK.length === 0) {
      setSelectedAKKText([]);
      return;
    }

    const selectedTmp = selectedAKK.filter(x => x.selected);
    if (selectedTmp.length === 0) {
      setSelectedAKKText([]);
      return;
    }

    const tmp = [];
    selectedTmp.forEach(item => {
      tmp.push({
        id: item.id,
        value: item.name,
      });
    });

    setSelectedAKKText(tmp.sort((a, b) => a.value > b.value));
  }, [selectedAKK]);

  if (loading && props.KTB.members) {
    const selectedAKKTmp = [];

    props.KTB.members.forEach(item => {
      selectedAKKTmp.push({
        id: item.member.id,
        name: item.member.name,
        selected: false,
      });
    });

    setSelectedAKK(selectedAKKTmp);
    setLoading(false);
  }

  const errorHandler = (error) => {
    setLoading(false);
    setErrorText(error.message);
  };

  const onSectionClick = (section) => {
    setSelectedSection(section);
  };

  const onAKKClick = (id, selected) => {
    if (!selected && selectedAKK.length === 0)
      return;

    const selectedAKKTmp = selectedAKK.filter(x => x.id !== id);

    selectedAKKTmp.push({
      id: id,
      name: props.KTB.members.filter(x => x.member.id === id)[0].member.name,
      selected: selected,
    });

    setSelectedAKK(selectedAKKTmp);
  };

  const callbackOnMaterialOpen = (result) => {
    setLoading(false);

    if (!result.succeed) {
      setErrorText(result.errorMessage);
      return;
    }

    setMaterials(result.result);
    setMaterialOpen(true);
  };

  const onMaterialOpen = (value) => {
    if (!value)
      return;

    setLoading(true);
    getallmaterialsapi.getallmaterials(props.User.email, callbackOnMaterialOpen, errorHandler);
  };

  const onMaterialChange = (id, materialName) => {
    setSelectedMaterialId(id);
    setSelectedMaterialName(materialName);
    onMaterialClose();
  };

  const onMaterialClose = () => {
    setMaterialOpen(false);
  };

  const {
    bodyContainerStyle,
    customActivityIndicatorStyle,
    menuButtonSectionStyle,
    menuButtonTextStyle,
    menuButtonEnableSectionStyle,
    menuButtonDisableSectionStyle,
    menuButtonTitleSectionStyle,
    menuButtonTitleEnableSectionStyle,
    menuButtonTitleDisableSectionStyle,
    menuButtonTitleDateSectionStyle,
    menuButtonTitleAKKSectionStyle,
    menuButtonTitleMaterialSectionStyle,
    menuButtonTitleViewHistorySectionStyle,
    menuButtonTitleDisableTextStyle,
    menuButtonTitleEnableTextStyle,
    menuButtonDataSectionStyle,
    menuButtonDataDateSectionStyle,
    menuButtonDataAKKSectionStyle,
    menuButtonDataMaterialSectionStyle,
    menuButtonDataTextStyle,
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
  } = AddKTBHistoryStyles;

  const {
    bodyDateContainerStyle,
    bodyDateContainerContentStyle,
    dateDatePickerSectionStyle,
    dateViewSectionStyle,
    dateViewButtonSectionStyle,
    dateViewButtonStyle,
    dateViewButtonTextStyle,
    dateViewInfoSectionStyle,
    dateViewInfoTextStyle,
  } = AddKTBHistoryDateStyles;

  const {
    bodyAKKContainerStyle,
    bodyAKKContainerContentStyle,
  } = AddKTBHistoryAKKStyles;

  const {
    bodyMaterialContainerStyle,
    bodyMaterialContainerContentStyle,
    materialSectionStyle,
    materialBookInputContainerStyle,
    materialBookInputStyle,
    materialBookResetButtonContainerStyle,
    materialBookResetButtonStyle,
    materialBookResetButtonTextStyle,
    materialBookButtonContainerStyle,
    materialBookButtonStyle,
    materialOtherInputSectionStyle,
    materialOtherInputStyle,
    materialChapterInputStyle,
  } = AddKTBHistoryMaterialStyles;

  const errorScreen = (
    <Error
      buttonClick={() => setErrorText('')}
      message={errorText}
    />
  );

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

  const sectionDateView = (
    <ScrollView
      style={bodyDateContainerStyle}
      contentContainerStyle={bodyDateContainerContentStyle}
      scrollEnabled={false}
    >
      <View style={dateDatePickerSectionStyle}>
        <DatePicker
          date={selectedDate ?? new Date()}
          onDateChange={setSelectedDate}
          minimumDate={minDt}
          maximumDate={maxDt}
          mode="date"
          androidVariant="nativeAndroid"
          fadeToColor="#EDEDED"
        />
      </View>
      <View style={dateViewSectionStyle}>
        <View style={dateViewButtonSectionStyle}>
          <TouchableOpacity
            style={dateViewButtonStyle}
            activeOpacity={0.4}
            onPress={() => setSelectedDate(new Date())}
          >
            <Text style={[globalFontStyle, dateViewButtonTextStyle]} numberOfLines={1}>Pilih Tanggal Hari Ini</Text>
          </TouchableOpacity>
        </View>
        <View style={dateViewInfoSectionStyle}>
          <Text style={[globalFontStyle, dateViewInfoTextStyle]} numberOfLines={1}>
            {DateToStringWithDay(selectedDate)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const akkViews = [];

  if (props.KTB.members)
    props.KTB.members.forEach(item => {
      const akk = selectedAKK.filter(detail => detail.id === item.member.id);
      let checked = false;

      if (akk.length > 0)
        checked = akk[0].selected;

      akkViews.push(
        <DiscipleShort
          key={item.member.id}
          member={item.member}
          onCheck={(id, selected) => onAKKClick(id, selected)}
          checked={checked}
        />
      );
    });

  const sectionAKKView = (
    <ScrollView
      style={bodyAKKContainerStyle}
      contentContainerStyle={bodyAKKContainerContentStyle}
    >
      {akkViews}
    </ScrollView>
  );

  const modalMaterialData = [];

  if (materials && materials.length > 0)
    materials.forEach(item => {
      modalMaterialData.push({
        id: item.id,
        name: item.name,
      });
    });

  let modalScreen = null;
  if (materialOpen && modalMaterialData.length > 0)
    modalScreen = (
      <ModalList
        selectedId={selectedMaterialId}
        selectedName={selectedMaterialName}
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
        list={modalMaterialData}
        onCancelClick={onMaterialClose}
        onSelectClick={onMaterialChange}
      />
    );

  const sectionMaterialView = (
    <ScrollView
      style={bodyMaterialContainerStyle}
      contentContainerStyle={bodyMaterialContainerContentStyle}
      scrollEnabled={false}
    >
      <View style={materialSectionStyle}>
        <CustomInputButton
          inputContainerStyle={materialBookInputContainerStyle}
          inputStyle={[globalFontStyle, materialBookInputStyle]}
          resetContainerStyle={materialBookResetButtonContainerStyle}
          resetButtonStyle={materialBookResetButtonStyle}
          resetButtonTextStyle={materialBookResetButtonTextStyle}
          buttonContainerStyle={materialBookButtonContainerStyle}
          buttonStyle={materialBookButtonStyle}
          buttonText="PILIH"
          placeholder="Bahan KTB"
          placeholderTextColor={PlaceholderTextColor}
          onInputButtonClick={(value) => onMaterialOpen(value)}
          onDeleteButtonClick={() => onMaterialChange(null, '')}
          value={selectedMaterialName}
        />
        <View style={materialOtherInputSectionStyle}>
          <TextInput
            style={[globalFontStyle, materialOtherInputStyle]}
            placeholder="Nama Bahan KTB"
            placeholderTextColor={PlaceholderTextColor}
          />
        </View>
        <View style={materialOtherInputSectionStyle}>
          <View
            style={{
              width: '18%',
              height: '100%',
              marginRight: ProportionateScreenSizeValue(5),
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                width: ProportionateScreenSizeValue(26),
                height: ProportionateScreenSizeValue(26),
                borderRadius: ProportionateScreenSizeValue(13),
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#815BF0',
              }}
            >
              <Text style={{
                fontSize: ProportionateScreenSizeValue(30),
                lineHeight: ProportionateScreenSizeValue(30),
                color: '#FFF',
              }}>+</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[globalFontStyle, materialChapterInputStyle]}
            placeholder="Bab"
            placeholderTextColor={PlaceholderTextColor}
            keyboardType="numeric"
          />
          <View
            style={{
              width: '18%',
              height: '100%',
              marginLeft: ProportionateScreenSizeValue(5),
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                width: ProportionateScreenSizeValue(26),
                height: ProportionateScreenSizeValue(26),
                borderRadius: ProportionateScreenSizeValue(13),
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFF',
                borderWidth: ProportionateScreenSizeValue(1),
                borderColor: '#815BF0',
              }}
            >
              <Text style={{
                fontSize: ProportionateScreenSizeValue(30),
                lineHeight: ProportionateScreenSizeValue(30),
                color: '#815BF0',
              }}>−</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const sectionViewHistoryView = (
    <ScrollView
      style={{
        width: '100%',
        paddingVertical: ProportionateScreenSizeValue(5),
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextInput/>
    </ScrollView>
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
    <View style={bodyContainerStyle}
    >
      <TouchableOpacity
        style={[menuButtonSectionStyle, sectionDate === selectedSection ? menuButtonEnableSectionStyle : menuButtonDisableSectionStyle]}
        onPress={() => onSectionClick(sectionDate)}
        disabled={selectedSection === sectionDate}
      >
        <View style={[menuButtonTitleSectionStyle, menuButtonTitleDateSectionStyle, sectionDate === selectedSection ? menuButtonTitleEnableSectionStyle : menuButtonTitleDisableSectionStyle]}>
          <Text
            style={[globalFontStyle, menuButtonTextStyle, sectionDate === selectedSection ? menuButtonTitleEnableTextStyle : menuButtonTitleDisableTextStyle]}
            numberOfLines={1}
          >
            Tanggal Pertemuan
          </Text>
        </View>
        {
          (sectionDate !== selectedSection) ?
          (
            <View style={[menuButtonDataSectionStyle, menuButtonDataDateSectionStyle]}>
              <Text
                style={[menuButtonTextStyle, menuButtonDataTextStyle]}
                numberOfLines={1}
              >
                {DateToStringWithDay(selectedDate)}
              </Text>
            </View>
          ) : null
        }
      </TouchableOpacity>
      {
        (selectedSection === sectionDate) ? sectionDateView : null
      }
      <TouchableOpacity
        style={[menuButtonSectionStyle, sectionAKK === selectedSection ? menuButtonEnableSectionStyle : menuButtonDisableSectionStyle]}
        onPress={() => onSectionClick(sectionAKK)}
        disabled={selectedSection === sectionAKK}
      >
        <View style={[menuButtonTitleSectionStyle, menuButtonTitleAKKSectionStyle, sectionAKK === selectedSection ? menuButtonTitleEnableSectionStyle : menuButtonTitleDisableSectionStyle]}>
          <Text
            style={[globalFontStyle, menuButtonTextStyle, sectionAKK === selectedSection ? menuButtonTitleEnableTextStyle : menuButtonTitleDisableTextStyle]}
            numberOfLines={1}
          >
            AKK
          </Text>
        </View>
        {
          (sectionAKK !== selectedSection) ?
          (
            <View style={[menuButtonDataSectionStyle, menuButtonDataAKKSectionStyle]}>
              <Text
                style={[menuButtonTextStyle, menuButtonDataTextStyle]}
                numberOfLines={1}
              >
                {ListToString(selectedAKKText, true)}
              </Text>
            </View>
          ) : null
        }
      </TouchableOpacity>
      {
        (selectedSection === sectionAKK) ? sectionAKKView : null
      }
      <TouchableOpacity
        style={[menuButtonSectionStyle, sectionMaterial === selectedSection ? menuButtonEnableSectionStyle : menuButtonDisableSectionStyle]}
        onPress={() => onSectionClick(sectionMaterial)}
        disabled={selectedSection === sectionMaterial}
      >
        <View style={[menuButtonTitleSectionStyle, menuButtonTitleMaterialSectionStyle, sectionMaterial === selectedSection ? menuButtonTitleEnableSectionStyle : menuButtonTitleDisableSectionStyle]}>
          <Text
            style={[globalFontStyle, menuButtonTextStyle, sectionMaterial === selectedSection ? menuButtonTitleEnableTextStyle : menuButtonTitleDisableTextStyle]}
            numberOfLines={1}
          >
            Bahan KTB
          </Text>
        </View>
        {
          (sectionMaterial !== selectedSection) ?
          (
            <View style={[menuButtonDataSectionStyle, menuButtonDataMaterialSectionStyle]}>
              <Text
                style={[menuButtonTextStyle, menuButtonDataTextStyle]}
                numberOfLines={1}
              >
                {selectedMaterialName}
              </Text>
            </View>
          ) : null
        }
      </TouchableOpacity>
      {
        (selectedSection === sectionMaterial) ? sectionMaterialView : null
      }
      <TouchableOpacity
        style={[menuButtonSectionStyle, sectionViewHistory === selectedSection ? menuButtonEnableSectionStyle : menuButtonDisableSectionStyle]}
        onPress={() => onSectionClick(sectionViewHistory)}
        disabled={selectedSection === sectionViewHistory}
      >
        <View style={[menuButtonTitleSectionStyle, menuButtonTitleViewHistorySectionStyle, sectionViewHistory === selectedSection ? menuButtonTitleEnableSectionStyle : menuButtonTitleDisableSectionStyle]}>
          <Text
            style={[globalFontStyle, menuButtonTextStyle, sectionViewHistory === selectedSection ? menuButtonTitleEnableTextStyle : menuButtonTitleDisableTextStyle]}
            numberOfLines={1}
          >
            Pertemuan Sebelumnya
          </Text>
        </View>
      </TouchableOpacity>
      {
        (selectedSection === sectionViewHistory) ? sectionViewHistoryView : null
      }
    </View>
  );

  const footer = (
      <View style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#FFF',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          style={{
            width: ProportionateScreenSizeValue(250),
            height: ProportionateScreenSizeValue(42),
            backgroundColor: '#F59873',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={0.5}
        >
          <Text style={{
              color: '#FFFFFF',
              fontStyle: 'normal',
              fontSize: ProportionateScreenSizeValue(16),
              lineHeight: ProportionateScreenSizeValue(15),
              fontWeight: 'bold',
            }}
            numberOfLines={1}
          >Save</Text>
        </TouchableOpacity>
      </View>
  );

  return (
    <BodyMenuBaseScreen
      title={`Entry History KTB${props.KTB ? ' ' + props.KTB.ktb.name : ''}`}
      overlayScreen={modalScreen}
      loadingScreen={loading ? loadingScreen : null}
      child={child}
      footer={footer}
      childName="AddKTBHistoryScreen"
      navigation={navigation}
      statusBarColor={BackgroundColor}
      errorScreen={errorText !== '' ? errorScreen : null}
    />
  );
};

const mapStateToProps = state => {
  const { Page, User, KTB } = state;
  return { Page, User, KTB };
};

export default connect(mapStateToProps)(AddKTBHistoryScreen);
