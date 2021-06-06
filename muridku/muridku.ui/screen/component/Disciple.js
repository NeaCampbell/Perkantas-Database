/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BasicStyles } from '../../asset/style-template/BasicStyles';
import { DiscipleStyles, IdColor } from '../../asset/style-template/DiscipleStyles';
import Checkbox from './Checkbox';
import {
  DateToStringWithMonthAsString,
} from '../../helper/CommonHelper';

const Disciple = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isActive, setIsActive] = useState(props.isActive);

  useEffect(() => {
    if (!props.isCheckedMode)
      setIsChecked(false);
  }, [props.isCheckedMode]);

  useEffect(() => {
    if (props.forceMemberCheck)
      setIsChecked(true);
  }, [props.forceMemberCheck]);

  useEffect(() => {
    if (props.forceMemberUncheck)
      setIsChecked(false);
  }, [props.forceMemberUncheck]);

  const onMemberActiveClick = (id) => {
    if (isActive)
      return;

    setIsActive(true);

    if (props.onMemberActiveClick)
      props.onMemberActiveClick(id);
  };

  const onMemberInactiveClick = (id) => {
    if (!isActive)
      return;

      setIsActive(false);

    if (props.onMemberActiveClick)
      props.onMemberInactiveClick(id);
  };

  const onMemberClick = (id) => {
    if (props.onMemberClick)
      props.onMemberClick(id);
  };

  const onMemberLongPress = () => {
    if (props.onMemberLongPress)
    props.onMemberLongPress();
  };

  const onMemberChecked = (id, checked) => {
    setIsChecked(checked);

    if (props.onMemberChecked)
      props.onMemberChecked(id, checked);
  };

  const {
    globalFontStyle,
  } = BasicStyles;

  const {
    bodyContainerStyle,
    discipleBoxSectionStyle,
    discipleBoxSectionCheckStyle,
    discipleBoxSectionUncheckStyle,
    checkBoxSectionStyle,
    textSectionStyle,
    nameSectionStyle,
    nameTitleSectionStyle,
    nameButtonSectionStyle,
    nameButtonInnerSectionStyle,
    nameButtonStyle,
    nameActiveEnableButtonStyle,
    nameActiveDisableButtonStyle,
    nameInactiveEnableButtonStyle,
    nameInactiveDisableButtonStyle,
    nameButtonTextStyle,
    nameTextStyle,
    descTopTextStyle,
    descTextStyle,
  } = DiscipleStyles;

  return (
    <View style={bodyContainerStyle}>
      <TouchableOpacity
        style={[discipleBoxSectionStyle, props.isCheckedMode ? discipleBoxSectionCheckStyle : discipleBoxSectionUncheckStyle]}
        activeOpacity={0.5}
        onPress={() => onMemberClick(props.member.member.id)}
        onLongPress={() => onMemberLongPress()}
        disabled={props.member.user.is_active === 1}
      >
        <View style={textSectionStyle}>
          <View style={nameSectionStyle}>
            <View style={nameTitleSectionStyle}>
              <Text style={[globalFontStyle, nameTextStyle]} numberOfLines={1} selectable>
                {props.member.member.name}
              </Text>
            </View>
            {
              (!props.isCheckedMode) ?
              (
                <View style={nameButtonSectionStyle}>
                  <View style={nameButtonInnerSectionStyle}>
                    <TouchableOpacity
                      style={[nameButtonStyle, isActive ? nameActiveEnableButtonStyle : nameActiveDisableButtonStyle]}
                      activeOpacity={0.4}
                      onPress={() => onMemberActiveClick(props.member.member.id)}
                    >
                      <Text style={nameButtonTextStyle}>✔</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={nameButtonInnerSectionStyle}>
                    <TouchableOpacity
                      style={[nameButtonStyle, !isActive ? nameInactiveEnableButtonStyle : nameInactiveDisableButtonStyle]}
                      activeOpacity={0.4}
                      onPress={() => onMemberInactiveClick(props.member.member.id)}
                    >
                      <Text style={nameButtonTextStyle}>✖</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null
            }
          </View>
          <Text style={[globalFontStyle, descTextStyle, descTopTextStyle]} numberOfLines={1} selectable>
            {props.member.user && props.member.user.email && props.member.user.email !== '' ? props.member.user.email : '-'}
          </Text>
          <Text style={[globalFontStyle, descTextStyle]} numberOfLines={1} selectable>
            {props.member.member.address && props.member.member.address !== '' ? props.member.member.address : '-'}
          </Text>
          <Text style={[globalFontStyle, descTextStyle]} numberOfLines={1} selectable>
            {props.member.member.birth_dt && props.member.member.birth_dt !== '' ? DateToStringWithMonthAsString(new Date(props.member.member.birth_dt)) : '-'}
          </Text>
          <Text style={[globalFontStyle, descTextStyle]} numberOfLines={1} selectable>
            {props.member.member.birth_place && props.member.member.birth_place !== '' ? props.member.member.birth_place : '-'}
          </Text>
          <Text style={[globalFontStyle, descTextStyle]} numberOfLines={1} selectable>
            {props.member.member.mobile_phn && props.member.member.mobile_phn !== '' ? props.member.member.mobile_phn : '-'}
          </Text>
          {/* for institution - API is not done yet */}
          <Text style={[globalFontStyle, descTextStyle]} numberOfLines={1} selectable>
            {props.member.institution && props.member.institution.name !== '' ? props.member.institution.name : '-'}
          </Text>
          {/* for faculty - API is not done yet */}
          <Text style={[globalFontStyle, descTextStyle]} numberOfLines={1} selectable>
          {props.member.faculty && props.member.faculty.name !== '' ? props.member.faculty.name : '-'}
          </Text>
        </View>
      </TouchableOpacity>
      {
        (props.isCheckedMode) ?
        (
          <View style={checkBoxSectionStyle}>
            <Checkbox
              activeColor={IdColor}
              checked={isChecked}
              onCheck={(value) => onMemberChecked(props.member.member.id, !value, props.onGroupChecked)}
            />
          </View>
        ) : null
      }
  </View>
  );
};

export default Disciple;
