/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, CheckBox as CheckBoxReact, Platform, ScrollView } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import { BasicStyles } from '../../asset/style-template/BasicStyles';
import { DiscipleshipGroupStyles } from '../../asset/style-template/DiscipleshipGroupStyles';

const DiscipleshipGroup = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (!props.isCheckedMode)
      setIsChecked(false);

    if (props.forceGroupCheck)
      setIsChecked(true);

    if (props.forceGroupUncheck)
      setIsChecked(false);
  }, []);

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
    ktbBoxSectionStyle,
    checkBoxSectionStyle,
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
  } = DiscipleshipGroupStyles;

  props.members.forEach(element => {
    members.push(
      <TouchableOpacity
        style={iconUserStyle}
        activeOpacity={0.3}
        key={element.member.id}
        onPress={() => onMemberClick(element.member.id, props.onMemberClick)}
      >
        <Text style={iconUserTextStyle}>{getFirstLetterName(element.member.name)}</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={[globalFontStyle, ktbBoxSectionStyle, {backgroundColor: props.colorHolder}]}
        activeOpacity={0.8}
        onPress={() => onGroupClick(props.group.id, props.onGroupClick)}
        delayLongPress={250}
        onLongPress={() => onGroupLongPress(props.group.id, props.onGroupLongPress)}
      >
        <View style={descSectionStyle}>
          <View style={groupSectionStyle}>
            <Text style={groupNameStyle}>
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
              <Text style={otherDescTextStyle}>
                Pertemuan Terakhir
              </Text>
            </View>
            <View style={otherDescValueStyle}>
              <Text style={otherDescTextStyle}>
                {props.group.last_meet_dt ?? '-'}
              </Text>
            </View>
          </View>
          <View style={[descSectionStyle, otherDescSectionStyle]}>
            <View style={otherDescTitleStyle}>
              <Text style={otherDescTextStyle}>
                Bahan Terakhir
              </Text>
            </View>
            <View style={otherDescValueStyle}>
              <Text style={otherDescTextStyle}>
                {props.group.last_meet_name ?? '-'}
              </Text>
            </View>
          </View>
          <View style={[descSectionStyle, otherDescSectionStyle]}>
            <View style={otherDescTitleStyle}>
              <Text style={otherDescTextStyle}>
                Bab Terakhir
              </Text>
            </View>
            <View style={otherDescValueStyle}>
              <Text style={otherDescTextStyle}>
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
            {
              (Platform.OS === 'web') ?
              <CheckBoxReact
                value={isChecked && props.isCheckedMode}
                onValueChange={() => onGroupChecked(props.group.id, !(isChecked && props.isCheckedMode), props.onGroupChecked)}
                style={{borderWidth: 0}}
              />
              :
              <CheckBox
                value={isChecked && props.isCheckedMode}
                onValueChange={() => onGroupChecked(props.group.id, !(isChecked && props.isCheckedMode), props.onGroupChecked)}
                style={{borderWidth: 0}}
              />
            }
          </View>
        ) : null
      }
    </View>
  );
};

export default DiscipleshipGroup;
