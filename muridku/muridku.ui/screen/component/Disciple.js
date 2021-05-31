/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BasicStyles } from '../../asset/style-template/BasicStyles';
import { DiscipleStyles, IdColor } from '../../asset/style-template/DiscipleStyles';
import Checkbox from './Checkbox';

const Disciple = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!props.isCheckedMode)
      setIsChecked(false);

    if (props.forceMemberCheck)
      setIsChecked(true);

    if (props.forceMemberUncheck)
      setIsChecked(false);
  }, [props.forceMemberCheck, props.forceMemberUncheck]);

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
        <View
          style={textSectionStyle}
        >
          <View
            style={nameSectionStyle}
          >
            <Text style={[globalFontStyle, nameTextStyle]} numberOfLines={1} selectable>
              {props.member.member.name}
            </Text>
          </View>
          <Text style={[globalFontStyle, descTextStyle, descTopTextStyle]} numberOfLines={1} selectable>
            {props.member.user && props.member.user.email !== undefined && props.member.user.email !== null && props.member.user.email !== '' ? props.member.user.email : '-'}
          </Text>
          <Text style={[globalFontStyle, descTextStyle]} numberOfLines={1} selectable>
            {props.member.member.address !== undefined && props.member.member.address !== null && props.member.member.address !== '' ? props.member.member.address : '-'}
          </Text>
          <Text style={[globalFontStyle, descTextStyle]} numberOfLines={1} selectable>
            {props.member.member.birth_dt !== undefined && props.member.member.birth_dt !== null && props.member.member.birth_dt !== '' ? props.member.member.birth_dt : '-'}
          </Text>
          <Text style={[globalFontStyle, descTextStyle]} numberOfLines={1} selectable>
            {props.member.member.birth_place !== undefined && props.member.member.birth_place !== null && props.member.member.birth_place !== '' ? props.member.member.birth_place : '-'}
          </Text>
          <Text style={[globalFontStyle, descTextStyle]} numberOfLines={1} selectable>
            {props.member.member.mobile_phn !== undefined && props.member.member.mobile_phn !== null && props.member.member.mobile_phn !== '' ? props.member.member.mobile_phn : '-'}
          </Text>
          {/* for institution - API is not done yet */}
          <Text style={[globalFontStyle, descTextStyle]} numberOfLines={1} selectable>
            {props.member.member.mobile_phn !== undefined && props.member.member.mobile_phn !== null && props.member.member.mobile_phn !== '' ? props.member.member.mobile_phn : '-'}
          </Text>
          {/* for faculty - API is not done yet */}
          <Text style={[globalFontStyle, descTextStyle]} numberOfLines={1} selectable>
            {props.member.member.mobile_phn !== undefined && props.member.member.mobile_phn !== null && props.member.member.mobile_phn !== '' ? props.member.member.mobile_phn : '-'}
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
