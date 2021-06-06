/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BasicStyles } from '../../asset/style-template/BasicStyles';
import { DiscipleshipGroupStyles } from '../../asset/style-template/DiscipleshipGroupStyles';
import Checkbox from './Checkbox';

const DiscipleshipGroup = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!props.isCheckedMode)
      setIsChecked(false);
  }, [props.isCheckedMode]);

  useEffect(() => {
    if (props.forceGroupCheck)
      setIsChecked(true);
  }, [props.forceGroupCheck]);

  useEffect(() => {
    if (props.forceGroupUncheck)
      setIsChecked(false);
  }, [props.forceGroupUncheck]);

  const getFirstLetterName = (name) => {
    let nameArr = name.split(' ');
    let result = '';

    for (let idx = 0; idx < nameArr.length && idx < 2; idx++)
      result += nameArr[idx][0];

    return result;
  };

  const onGroupClick = (id, onParentGroupClick) => {
    if (onParentGroupClick)
      onParentGroupClick(id);
  };

  const onGroupLongPress = (id, onParentGroupLongPress) => {
    if (onParentGroupLongPress)
      onParentGroupLongPress(id);
  };

  const onGroupChecked = (id, checked, onParentGroupChecked) => {
    setIsChecked(checked);

    if (onParentGroupChecked)
      onParentGroupChecked(id, checked);
  };

  const onMemberClick = (id, onParentMemberClick) => {
    if (onParentMemberClick)
      onParentMemberClick(id);
  };

  let members = [];

  const {
    globalFontStyle,
  } = BasicStyles;

  const {
    bodyContainerStyle,
    ktbBoxSectionStyle,
    ktbBoxSectionCheckStyle,
    ktbBoxSectionUncheckStyle,
    scrollViewSectionStyle,
    descSectionStyle,
    otherDescSectionStyle,
    groupSectionStyle,
    groupNameStyle,
    memberSectionStyle,
    iconUserStyle,
    iconUserTextStyle,
    otherDescTitleStyle,
    otherDescValueStyle,
    otherDescTextStyle,
    checkBoxSectionStyle,
  } = DiscipleshipGroupStyles;

  if (props.members)
  props.members.forEach(element => {
    members.push(
      <TouchableOpacity
        style={iconUserStyle}
        activeOpacity={0.3}
        key={element.member.id}
        onPress={() => onMemberClick(element.member.id, props.onMemberClick)}
      >
        <Text style={iconUserTextStyle} numberOfLines={1}>{getFirstLetterName(element.member.name)}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={bodyContainerStyle}>
      <TouchableOpacity
        style={[globalFontStyle, ktbBoxSectionStyle, (props.isCheckedMode ? ktbBoxSectionCheckStyle : ktbBoxSectionUncheckStyle)]}
        activeOpacity={0.8}
        onPress={() => onGroupClick(props.group.id, props.onGroupClick)}
        delayLongPress={250}
        onLongPress={() => onGroupLongPress(props.group.id, props.onGroupLongPress)}
      >
        <View style={descSectionStyle}>
          <View style={groupSectionStyle}>
            <Text style={groupNameStyle} numberOfLines={1} selectable>
              {props.group.name}
            </Text>
          </View>
          <View style={memberSectionStyle}>
            {members}
          </View>
        </View>
        <ScrollView style={scrollViewSectionStyle}>
          <View style={[descSectionStyle, otherDescSectionStyle]}>
            <View style={otherDescTitleStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                Pertemuan Terakhir
              </Text>
            </View>
            <View style={otherDescValueStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                {props.group.last_meet_dt ?? '-'}
              </Text>
            </View>
          </View>
          <View style={[descSectionStyle, otherDescSectionStyle]}>
            <View style={otherDescTitleStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                Bahan Terakhir
              </Text>
            </View>
            <View style={otherDescValueStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                {props.group.last_meet_name ?? '-'}
              </Text>
            </View>
          </View>
          <View style={[descSectionStyle, otherDescSectionStyle]}>
            <View style={otherDescTitleStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                Bab Terakhir
              </Text>
            </View>
            <View style={otherDescValueStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                {props.group.last_meet_chapter ?? '-'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </TouchableOpacity>
      {
        (props.isCheckedMode) ?
        (
          <View style={checkBoxSectionStyle}>
            <Checkbox
              checked={isChecked}
              onCheck={(value) => onGroupChecked(props.group.id, !value, props.onGroupChecked)}
            />
          </View>
        ) : null
      }
    </View>
  );
};

export default DiscipleshipGroup;
