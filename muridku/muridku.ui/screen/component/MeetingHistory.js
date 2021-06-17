/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React from 'react';
import { View, Text } from 'react-native';
import { BasicStyles } from '../../asset/style-template/BasicStyles';
import { MeetingHistoryStyles } from '../../asset/style-template/MeetingHistoryStyles';
import {
  DateToStringWithDay,
} from '../../helper/CommonHelper';

const MeetingHistory = (props) => {
  const getFirstLetterName = (name) => {
    let nameArr = name.split(' ');
    let result = nameArr[0] ?? '';

    return result;
  };

  let members = '';

  const {
    globalFontStyle,
  } = BasicStyles;

  const {
    bodyContainerStyle,
    ktbBoxSectionStyle,
    scrollViewSectionStyle,
    descSectionStyle,
    otherDescSectionStyle,
    otherDescTitleStyle,
    otherDescValueStyle,
    otherDescTextStyle,
  } = MeetingHistoryStyles;

  if (props.members)
    props.members.forEach(element => {
      members += ((members === '') ? '' : ', ') + getFirstLetterName(element.name);
    });

  return (
    <View style={bodyContainerStyle}>
      <View style={[globalFontStyle, ktbBoxSectionStyle]}>
        <View style={scrollViewSectionStyle}>
          <View style={[descSectionStyle, otherDescSectionStyle]}>
            <View style={otherDescTitleStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                Tanggal
              </Text>
            </View>
            <View style={otherDescValueStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                {DateToStringWithDay(new Date(props.history.meet_dt)) ?? '-'}
              </Text>
            </View>
          </View>
          <View style={[descSectionStyle, otherDescSectionStyle]}>
            <View style={otherDescTitleStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                Bahan
              </Text>
            </View>
            <View style={otherDescValueStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                {props.history.material_name ?? '-'}
              </Text>
            </View>
          </View>
          <View style={[descSectionStyle, otherDescSectionStyle]}>
            <View style={otherDescTitleStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                Bab
              </Text>
            </View>
            <View style={otherDescValueStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                {props.history.material_chapter ?? '-'}
              </Text>
            </View>
          </View>
          <View style={[descSectionStyle, otherDescSectionStyle]}>
            <View style={otherDescTitleStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                Peserta
              </Text>
            </View>
            <View style={otherDescValueStyle}>
              <Text style={otherDescTextStyle} numberOfLines={1} selectable>
                {members ?? '-'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MeetingHistory;
