/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import { BasicStyles } from '../asset/style-template/BasicStyles';
import { AddKTBHistoryStyles } from '../asset/style-template/AddKTBHistoryStyles';
import { BackgroundColor } from '../asset/style-template/MenuBasicStyles';
import {
  ProportionateScreenSizeValue,
} from '../helper/CommonHelper';
import DiscipleShort from './component/DiscipleShort';
import Error from './component/Error';

const AddKTBHistoryScreen = (props) => {
  const { navigation } = props;
  const sectionDate = 'DATE';
  const sectionAKK = 'AKK';
  const sectionMaterial = 'MTRL';
  const sectionViewHistory = 'VIEW';
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState(sectionDate);
  const [errorText, setErrorText] = useState('');
  const [selectedAKK, setSelectedAKK] = useState([]);
  const { globalFontStyle, basicInputStyle } = BasicStyles;

  if (loading) {
    const selectedAKKTmp = [];

    props.KTB.members.forEach(item => {
      selectedAKKTmp.push({
        id: item.member.id,
        selected: false,
      });
    });

    setSelectedAKK(selectedAKKTmp);
    setLoading(false);
  }

  const onSectionClick = (section) => {
    setSelectedSection(section);
  };

  const onAKKClick = (id, selected) => {
    if (!selected && selectedAKK.length === 0)
      return;

    const selectedAKKTmp = selectedAKK.filter(x => x.id !== id);

    selectedAKKTmp.push({
      id: id,
      selected: selected,
    });

    setSelectedAKK(selectedAKKTmp);
  };

  const {
    bodyContainerStyle,
    searchSectionStyle,
    searchContainerStyle,
    searchTextStyle,
    footerViewStyle,
    buttonStyle,
  } = AddKTBHistoryStyles;

  const errorScreen = (
    <Error
      buttonClick={() => setErrorText('')}
      message={errorText}
    />
  );

  const akkViews = [];

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
      style={{
        width: '100%',
        paddingVertical: ProportionateScreenSizeValue(5),
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {akkViews}
    </ScrollView>
  );

  const sectionDateView = (
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

  const sectionMaterialView = (
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

  const getSectionStyle = (section) => {
    const result = {
      width: '100%',
      height: ProportionateScreenSizeValue(25),
      marginBottom: ProportionateScreenSizeValue(2),
      alignItems: 'flex-start',
      fontSize: ProportionateScreenSizeValue(12),
      backgroundColor: '#999',
    };

    if (section === selectedSection) {
      result.height = ProportionateScreenSizeValue(35);
      result.fontSize = ProportionateScreenSizeValue(14);
      result.marginBottom = 0;
      result.alignItems = 'flex-start';

      if (section === sectionAKK) {
        // result.backgroundColor = '#08d49a';
        result.backgroundColor = '#366BC6';
        return result;
      }
      if (section === sectionDate) {
        // result.backgroundColor = '#366BC6';
        result.backgroundColor = '#366BC6';
        return result;
      }
      if (section === sectionMaterial) {
        // result.backgroundColor = '#E23758';
        result.backgroundColor = '#366BC6';
        return result;
      }
      if (section === sectionViewHistory) {
        // result.backgroundColor = '#DB6809';
        result.backgroundColor = '#366BC6';
        return result;
      }
    }

    const opacity = 0.4;

    if (section === sectionAKK) {
      // result.backgroundColor = `rgba(8, 212, 154, ${opacity})`;
      result.backgroundColor = `rgba(54, 107, 198, ${opacity})`;
      return result;
    }
    if (section === sectionDate) {
      // result.backgroundColor = `rgba(54, 107, 198, ${opacity})`;
      result.backgroundColor = `rgba(54, 107, 198, ${opacity})`;
      return result;
    }
    if (section === sectionMaterial) {
      // result.backgroundColor = `rgba(226, 55, 88, ${opacity})`;
      result.backgroundColor = `rgba(54, 107, 198, ${opacity})`;
      return result;
    }
    if (section === sectionViewHistory) {
      // result.backgroundColor = `rgba(219, 104, 9, ${opacity})`;
      result.backgroundColor = `rgba(54, 107, 198, ${opacity})`;
      return result;
    }

    return result;
  };

  const child = (
    <View style={{
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: getSectionStyle(sectionDate).backgroundColor,
          width: getSectionStyle(sectionDate).width,
          height: getSectionStyle(sectionDate).height,
          paddingHorizontal: ProportionateScreenSizeValue(15),
          justifyContent: 'center',
          alignItems: getSectionStyle(sectionDate).alignItems,
          marginBottom: getSectionStyle(sectionDate).marginBottom,
        }}
        onPress={() => onSectionClick(sectionDate)}
        disabled={selectedSection === sectionDate}
      >
        <Text style={{
            fontSize: getSectionStyle(sectionDate).fontSize,
            fontStyle: 'italic',
            color: '#FFF',
          }}
        >
          Tanggal Pertemuan
        </Text>
      </TouchableOpacity>
      {
        (selectedSection === sectionDate) ? sectionDateView : null
      }
      <TouchableOpacity
        style={{
          backgroundColor: getSectionStyle(sectionAKK).backgroundColor,
          width: getSectionStyle(sectionAKK).width,
          height: getSectionStyle(sectionAKK).height,
          paddingHorizontal: ProportionateScreenSizeValue(15),
          justifyContent: 'center',
          alignItems: getSectionStyle(sectionAKK).alignItems,
          marginBottom: getSectionStyle(sectionAKK).marginBottom,
        }}
        onPress={() => onSectionClick(sectionAKK)}
        disabled={selectedSection === sectionAKK}
      >
        <Text style={{
            fontSize: getSectionStyle(sectionAKK).fontSize,
            fontStyle: 'italic',
            color: '#FFF',
          }}
        >
          AKK
        </Text>
      </TouchableOpacity>
      {
        (selectedSection === sectionAKK) ? sectionAKKView : null
      }
      <TouchableOpacity
        style={{
          backgroundColor: getSectionStyle(sectionMaterial).backgroundColor,
          width: getSectionStyle(sectionMaterial).width,
          height: getSectionStyle(sectionMaterial).height,
          paddingHorizontal: ProportionateScreenSizeValue(15),
          justifyContent: 'center',
          alignItems: getSectionStyle(sectionMaterial).alignItems,
          marginBottom: getSectionStyle(sectionMaterial).marginBottom,
        }}
        onPress={() => onSectionClick(sectionMaterial)}
        disabled={selectedSection === sectionMaterial}
      >
        <Text style={{
            fontSize: getSectionStyle(sectionMaterial).fontSize,
            fontStyle: 'italic',
            color: '#FFF',
          }}
        >
          Bahan KTB
        </Text>
      </TouchableOpacity>
      {
        (selectedSection === sectionMaterial) ? sectionMaterialView : null
      }
      <TouchableOpacity
        style={{
          backgroundColor: getSectionStyle(sectionViewHistory).backgroundColor,
          width: getSectionStyle(sectionViewHistory).width,
          height: getSectionStyle(sectionViewHistory).height,
          paddingHorizontal: ProportionateScreenSizeValue(15),
          justifyContent: 'center',
          alignItems: getSectionStyle(sectionViewHistory).alignItems,
        }}
        onPress={() => onSectionClick(sectionViewHistory)}
        disabled={selectedSection === sectionViewHistory}
      >
        <Text style={{
            fontSize: getSectionStyle(sectionViewHistory).fontSize,
            fontStyle: 'italic',
            color: '#FFF',
          }}
        >
          History Sebelumnya
        </Text>
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
          >Save</Text>
        </TouchableOpacity>
      </View>
  );

  return (
    <BodyMenuBaseScreen
      title={`Entry History KTB${props.ktb ? ' ' + props.ktb.name : ''}`}
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
