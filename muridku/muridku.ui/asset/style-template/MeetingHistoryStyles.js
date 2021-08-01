/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

const BorderColor = '#CDCDCD';

export const MeetingHistoryStyles = StyleSheet.create({
  bodyContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: ProportionateScreenSizeValue(80),
  },
  ktbBoxSectionStyle: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    flex: 1,
    padding: ProportionateScreenSizeValue(10),
    borderBottomWidth: ProportionateScreenSizeValue(1),
    borderBottomColor: BorderColor,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    backgroundColor: '#FAFAFA',
  },
  scrollViewSectionStyle: {
    width: '100%',
  },
  descSectionStyle: {
    width: '100%',
    flexDirection: 'row',
  },
  otherDescSectionStyle: {
    height: ProportionateScreenSizeValue(15),
  },
  otherDescTitleStyle: {
    width: '30%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  otherDescValueStyle: {
    width: '70%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  otherDescTextStyle: {
    color: '#666',
    fontSize: ProportionateScreenSizeValue(10),
  },
});
