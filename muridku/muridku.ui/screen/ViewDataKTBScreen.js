/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import { BasicStyles } from '../asset/style-template/BasicStyles';
import { ViewDataKTBStyles } from '../asset/style-template/ViewDataKTBStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ProportionateScreenSizeValue,
  ChangeColorFunction,
} from '../helper/CommonHelper';
import { SET_SELECTED_KTB, SET_SELECTED_MEMBER } from '../reducer/action/ActionConst';

const getktbapi = require('../api/out/getktbbyktbid');

const ViewDataKTBScreen = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');

  const errorHandler = (error) => {
    setLoading(false);
    setErrorText(error.message);
  };

  const callback = (result) => {
    setLoading(false);

    if (!result.succeed)
      setErrorText(result.errorMessage);

    props.dispatch({type: SET_SELECTED_KTB, ktb: result.result});
  };

  if (loading)
    getktbapi.getktbbyktbid(props.KTB.ktb.id, callback, errorHandler);

    const {
      globalFontStyle,
      errorSectionStyle,
      errorMessageContainerStyle,
      errorMessageTextStyle,
      errorMessageButtonStyle,
      errorMessageButtonTextStyle,
    } = BasicStyles;

  const {
    bodyContainerStyle,
    historySectionStyle,
    historyInnerSectionStyle,
    historyInnerTitleSectionStyle,
    historyTextStyle,
    contentSectionStyle,
    contentSectionInnerStyle,
    discipleSectionStyle,
    buttonDiscipleStyle,
    textButtonSectionStyle,
    footerSectionStyle,
    footerViewStyle,
    nameButtonSectionStyle,
    nameButtonTextStyle,
    cityButtonTopTextStyle,
    cityButtonTextStyle,
    buttonFooterStyle,
  } = ViewDataKTBStyles;

  const onMemberClick = (id) => {
    const selectedMembers = props.KTB.members.filter((data) => {return data.member.id === id;});

    if (selectedMembers.length === 0)
      return;

    const selectedMember = selectedMembers[0];
    props.dispatch({ type: SET_SELECTED_MEMBER, member: selectedMember });
    navigation.replace('EntryDataAKKScreen');
  };

  const addMemberClick = () => {
    props.dispatch({ type: SET_SELECTED_MEMBER, member: null });
    navigation.replace('EntryDataAKKScreen');
  };

  const deleteMemberClick = () => {
  };

  let disciple = [];
  let discipleColors = [];

  if (props.KTB.members.length > 0)
    props.KTB.members.forEach((item) => {
      const color = ChangeColorFunction( discipleColors );

      disciple.push(
        (
          <View style={discipleSectionStyle} key={item.member.id}>
            <TouchableOpacity
              style={[buttonDiscipleStyle, {backgroundColor: color}]}
              activeOpacity={0.5}
              onPress={() => onMemberClick(item.member.id)}
              disabled={item.user.is_active === 1}
            >
              {/* <Image
                source={require('../asset/img/man.png')}
                style={disciplePhotoStyle}
              /> */}
              <View
                style={textButtonSectionStyle}
              >
                <View
                  style={nameButtonSectionStyle}
                >
                  <Text style={[globalFontStyle, nameButtonTextStyle]}>
                    {item.member.name}
                  </Text>
                </View>
                <Text style={[globalFontStyle, cityButtonTopTextStyle]}>
                  {item.user && item.user.email !== undefined && item.user.email !== null && item.user.email !== '' ? item.user.email : '-'}
                </Text>
                <Text style={[globalFontStyle, cityButtonTextStyle]}>
                  {item.member.address !== undefined && item.member.address !== null && item.member.address !== '' ? item.member.address : '-'}
                </Text>
                <Text style={[globalFontStyle, cityButtonTextStyle]}>
                  {item.member.birth_dt !== undefined && item.member.birth_dt !== null && item.member.birth_dt !== '' ? item.member.birth_dt : '-'}
                </Text>
                <Text style={[globalFontStyle, cityButtonTextStyle]}>
                  {item.member.birth_place !== undefined && item.member.birth_place !== null && item.member.birth_place !== '' ? item.member.birth_place : '-'}
                </Text>
                <Text style={[globalFontStyle, cityButtonTextStyle]}>
                  {item.member.mobile_phn !== undefined && item.member.mobile_phn !== null && item.member.mobile_phn !== '' ? item.member.mobile_phn : '-'}
                </Text>
                {/* for institution - API is not done yet */}
                <Text style={[globalFontStyle, cityButtonTextStyle]}>
                  {item.member.mobile_phn !== undefined && item.member.mobile_phn !== null && item.member.mobile_phn !== '' ? item.member.mobile_phn : '-'}
                </Text>
                {/* for faculty - API is not done yet */}
                <Text style={[globalFontStyle, cityButtonTextStyle]}>
                  {item.member.mobile_phn !== undefined && item.member.mobile_phn !== null && item.member.mobile_phn !== '' ? item.member.mobile_phn : '-'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      );
    });

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

  const child = (
    <View style={bodyContainerStyle}>
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
      {groupHistory}
      <ScrollView
        style={contentSectionStyle}
        contentContainerStyle={contentSectionInnerStyle}
      >
          {disciple}
      </ScrollView>
    </View>
  );

  const footer = (
    <View style={footerSectionStyle}>
      <View style={footerViewStyle}>
        <TouchableOpacity
          style={buttonFooterStyle}
          activeOpacity={0.5}
          onPress={() => addMemberClick()}
        >
          <Icon name="add" size={ProportionateScreenSizeValue(25)} color="white"/>
        </TouchableOpacity>
      </View>
      <View style={footerViewStyle}>
        <TouchableOpacity
          style={buttonFooterStyle}
          activeOpacity={0.5}
          onPress={() => deleteMemberClick()}
          disabled={true}
        >
          <Icon name="history" size={ProportionateScreenSizeValue(25)} color="white"/>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <BodyMenuBaseScreen
      title={`Kelompok ${props.KTB.ktb.name}`}
      child={child}
      footer={footer}
    />
  );
};

const mapStateToProps = state => {
  const { User, KTB } = state;
  return { User, KTB };
};

export default connect(mapStateToProps)(ViewDataKTBScreen);
