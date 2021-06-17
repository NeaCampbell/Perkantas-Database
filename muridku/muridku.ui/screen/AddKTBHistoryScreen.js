/* eslint-disable prettier/prettier */
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
import { AddKTBHistoryViewHistoryStyles } from '../asset/style-template/AddKTBHistoryViewHistoryStyles';
import { BackgroundColor } from '../asset/style-template/MenuBasicStyles';
import {
  ProportionateScreenSizeValue,
  DateToStringWithDay,
  ListToString,
  CommonMessages,
  DateToStringApi,
} from '../helper/CommonHelper';
import DiscipleShort from './component/DiscipleShort';
import Error from './component/Error';
import DatePicker from 'react-native-date-picker';
import CustomInputButton from './component/CustomInputButton';
import ModalList from './component/ModalList';
import MeetingHistory from './component/MeetingHistory';

const getallmaterialsapi = require('../api/out/getallmaterials');
const getlastmaterialapi = require('../api/out/getlastktbmaterialbyktbid');
const gethistoryapi = require('../api/out/getktbhistorybyktbid');
const savehistoryapi = require('../api/out/savesinglektbhistory');

const AddKTBHistoryScreen = (props) => {
  const uppingValue = 'UP';
  const loweringValue = 'DOWN';
  const otherMaterialCode = 'OTH';
  const { navigation } = props;
  const sectionDate = 'DATE';
  const sectionAKK = 'AKK';
  const sectionMaterial = 'MTRL';
  const sectionViewHistory = 'HIST';
  const [loading, setLoading] = useState(true);
  const [isFirstEntry, setIsFirstEntry] = useState(true);
  const [selectedSection, setSelectedSection] = useState(sectionDate);
  const [errorText, setErrorText] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAKK, setSelectedAKK] = useState([]);
  const [selectedAKKText, setSelectedAKKText] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [materialOpen, setMaterialOpen] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [selectedMaterialMaxChapter, setSelectedMaterialMaxChapter] = useState(0);
  const [selectedMaterialCode, setSelectedMaterialCode] = useState('');
  const [selectedMaterialName, setSelectedMaterialName] = useState('');
  const [selectedMaterialCustomName, setSelectedMaterialCustomName] = useState('');
  const [selectedMaterialChapter, setSelectedMaterialChapter] = useState(null);
  const [ktbHistories, setKtbHistories] = useState([]);

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

  if (isFirstEntry && props.KTB.members) {
    const selectedAKKTmp = [];

    props.KTB.members.forEach(item => {
      selectedAKKTmp.push({
        id: item.member.id,
        name: item.member.name,
        selected: false,
      });
    });

    setSelectedAKK(selectedAKKTmp);

    if (loading)
      setLoading(false);

    setIsFirstEntry(false);
  }

  const errorHandler = (error) => {
    setLoading(false);
    setErrorText(error.message);
  };

  const callbackGetHistory = (result) => {
    setLoading(false);

    if (!result.succeed && result.errorMessage !== CommonMessages.DATA_NOT_FOUND) {
      setErrorText(result.errorMessage);
      return;
    }

    if (result.result.histories)
      setKtbHistories(result.result.histories);
  };

  const onSectionClick = (section) => {
    setSelectedSection(section);

    if (section === sectionViewHistory) {
      setLoading(true);
      gethistoryapi.getktbhistorybyktbid(props.KTB.ktb.id, props.User.email, callbackGetHistory, errorHandler);
    }
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

  const callbackGetLastMaterial = (result) => {
    if (!result.succeed) {
      setLoading(false);
      setErrorText(result.errorMessage);
      return;
    }

    const lastMaterial = result.result;
    setSelectedMaterialId(lastMaterial.id);
    setSelectedMaterialCode(lastMaterial.code);
    setSelectedMaterialName(lastMaterial.name);
    setSelectedMaterialCustomName(lastMaterial.custom_name);
    setSelectedMaterialMaxChapter(lastMaterial.chapter_count);
    setSelectedMaterialChapter(lastMaterial.chapter);
    setLoading(false);
  };

  const onGetLastMaterial = (ktbId) => {
    setLoading(true);

    getlastmaterialapi.getlastktbmaterialbyktbid(ktbId, props.User.email, callbackGetLastMaterial, errorHandler);
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
    const selectedChapters = materials.filter(x => x.id === id);

    if (id && (!selectedChapters || selectedChapters.length === 0)) {
      setErrorText('data bahan KTB tidak ditemukan.');
      return;
    }

    setSelectedMaterialId(id);
    setSelectedMaterialName(materialName);
    setSelectedMaterialCustomName((id && selectedChapters[0].code === otherMaterialCode) ? '' : materialName);
    setSelectedMaterialChapter(null);

    if (id) {
      setSelectedMaterialCode(selectedChapters[0].code);
      setSelectedMaterialMaxChapter(selectedChapters[0].chapter_count);
      onMaterialClose();
      return;
    }

    setSelectedMaterialCode('');
    setSelectedMaterialMaxChapter(0);
    onMaterialClose();
  };

  const onMaterialClose = () => {
    setMaterialOpen(false);
  };

  const onMaterialNameChange = (value) => {
    setSelectedMaterialCustomName(value);

    if (!value)
      setSelectedMaterialChapter(null);
  };

  const onMaterialChapterChange = (condition) => {
    switch (condition) {
      case uppingValue :
        if (selectedMaterialChapter < selectedMaterialMaxChapter || selectedMaterialMaxChapter === 0)
          setSelectedMaterialChapter(selectedMaterialChapter + 1);
        return;
      case loweringValue :
        if (selectedMaterialChapter > 0)
          setSelectedMaterialChapter(selectedMaterialChapter - 1);
        return;
      default:
        return;
    }
  };

  const callbackSave = (result) => {
    if (!result.succeed) {
      setLoading(false);
      setErrorText(result.errorMessage);
      return;
    }

    setSelectedAKK([]);
    setSelectedMaterialId(null);
    setSelectedMaterialCode('');
    setSelectedMaterialName('');
    setSelectedMaterialCustomName('');
    setSelectedMaterialMaxChapter(0);
    setSelectedMaterialChapter(null);
    setLoading(false);
    onSectionClick(sectionViewHistory);
  };

  const onSaveClick = () => {
    if (!selectedDate) {
      setErrorText('tanggal KTB belum dipilih.');
      return;
    }

    if (!selectedAKK || selectedAKK.filter(x => x.selected).length === 0) {
      setErrorText('peserta KTB belum dipilih.');
      return;
    }
    if (!selectedMaterialId || !selectedMaterialCustomName || !selectedMaterialChapter) {
      setErrorText('materi KTB belum dipilih.');
      return;
    }

    const members = [];

    selectedAKK.forEach(item => {
      members.push({
        member_id: item.id,
        is_attending: item.selected ? 1 : 0,
      });
    });

    setLoading(true);
    savehistoryapi.savesinglektbhistory(props.KTB.ktb.id, DateToStringApi(selectedDate), selectedMaterialId,
      selectedMaterialCustomName, selectedMaterialChapter, members, props.User.email, callbackSave, errorHandler);
  };

  const { globalFontStyle } = BasicStyles;

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
    dropdownListSearchSectionStyle,
    dropdownListSearchSectionContainerStyle,
    dropdownListSearchInputStyle,
    dropdownListSearchButtonStyle,
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
    footerSectionStyle,
    footerButtonSaveStyle,
    footerButtonSaveTextStyle,
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
    materialGetLastMaterialSectionStyle,
    materialGetLastMaterialTextStyle,
    materialBookInputContainerStyle,
    materialBookInputStyle,
    materialBookResetButtonContainerStyle,
    materialBookResetButtonStyle,
    materialBookResetButtonTextStyle,
    materialBookButtonContainerStyle,
    materialBookButtonStyle,
    materialOtherInputSectionStyle,
    materialOtherInputStyle,
    materialChapterButtonSectionStyle,
    materialChapterButtonAddStyle,
    materialChapterButtonAddTextStyle,
    materialChapterButtonReduceStyle,
    materialChapterButtonReduceTextStyle,
    materialChapterInputStyle,
  } = AddKTBHistoryMaterialStyles;

  const {
    bodyViewHistoryContainerStyle,
    bodyViewHistoryContentContainerStyle,
  } = AddKTBHistoryViewHistoryStyles;

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
      const ktbmembers = props.KTB.ktbmembers.filter(x => x.member_id === item.member.id);
      let checked = false;

      if (akk.length > 0)
        checked = akk[0].selected;

      if (ktbmembers.length > 0 && ktbmembers[0].is_active === 1)
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
        searchSectionStyle={dropdownListSearchSectionStyle}
        searchSectionContainerStyle={dropdownListSearchSectionContainerStyle}
        searchInputStyle={dropdownListSearchInputStyle}
        searchButtonStyle={dropdownListSearchButtonStyle}
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
        <View style={materialGetLastMaterialSectionStyle}>
          <TouchableOpacity
            onPress={() => onGetLastMaterial(props.KTB.ktb.id)}
          >
            <Text style={materialGetLastMaterialTextStyle}>Ambil bahan dari pertemuan terakhir</Text>
          </TouchableOpacity>
        </View>
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
        {
          (selectedMaterialId && selectedMaterialCode === otherMaterialCode) ?
          (
            <View style={materialOtherInputSectionStyle}>
              <TextInput
                style={[globalFontStyle, materialOtherInputStyle]}
                placeholder="Nama Bahan KTB"
                placeholderTextColor={PlaceholderTextColor}
                value={selectedMaterialCustomName}
                onChangeText={(value) => onMaterialNameChange(value)}
              />
            </View>
          ) : null
        }
        <View style={materialOtherInputSectionStyle}>
          <View style={materialChapterButtonSectionStyle}>
            <TouchableOpacity
              style={materialChapterButtonAddStyle}
              onPress={() => onMaterialChapterChange(uppingValue)}
              disabled={!(selectedMaterialName || selectedMaterialCustomName)}
              activeOpacity={0.5}
            >
              <Text style={materialChapterButtonAddTextStyle}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[globalFontStyle, materialChapterInputStyle]}
            placeholder="Bab"
            placeholderTextColor={PlaceholderTextColor}
            keyboardType="numeric"
            editable={false}
            value={selectedMaterialChapter ? selectedMaterialChapter.toString() : ''}
          />
          <View style={materialChapterButtonSectionStyle}>
            <TouchableOpacity
              style={materialChapterButtonReduceStyle}
              onPress={() => onMaterialChapterChange(loweringValue)}
              disabled={!(selectedMaterialName || selectedMaterialCustomName)}
              activeOpacity={0.5}
            >
              <Text style={materialChapterButtonReduceTextStyle}>
                −
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const histories = [];

  if (selectedSection === sectionViewHistory && ktbHistories && ktbHistories.length > 0) {
    let id = 0;

    ktbHistories.forEach(item => {
      histories.push(
        <MeetingHistory
          key={id}
          history={item.ktbhistory}
          members={item.members}
        />
      );

      id++;
    });
  }

  const sectionViewHistoryView = (
    <ScrollView
      style={bodyViewHistoryContainerStyle}
      contentContainerStyle={bodyViewHistoryContentContainerStyle}
    >
      {histories}
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
                {`${selectedMaterialCustomName && selectedMaterialCustomName !== '' ? selectedMaterialCustomName : selectedMaterialName} ${selectedMaterialChapter && selectedMaterialChapter !== '' ? ('bab ' + selectedMaterialChapter) : ''}`}
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
      <View style={footerSectionStyle}>
        <TouchableOpacity
          style={footerButtonSaveStyle}
          activeOpacity={0.5}
          onPress={() => onSaveClick()}
        >
          <Text style={footerButtonSaveTextStyle}
            numberOfLines={1}
          >
            Save
          </Text>
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
