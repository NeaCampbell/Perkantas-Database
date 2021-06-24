/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

const DetailTextColor = '#000';
export const IdColor = '#77C0ED';
export const IdColorDisabled = '#ABABAB';
const BorderColor = '#CDCDCD';

export const DiscipleStyles = StyleSheet.create({
  bodyContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: ProportionateScreenSizeValue(160),
  },
  discipleBoxSectionStyle: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    paddingHorizontal: ProportionateScreenSizeValue(10),
    borderLeftWidth: ProportionateScreenSizeValue(10),
    borderBottomWidth: ProportionateScreenSizeValue(1),
    borderBottomColor: BorderColor,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  discipleBoxSectionEnabledStyle: {
    borderLeftColor: IdColor,
  },
  discipleBoxSectionDisabledStyle: {
    borderLeftColor: IdColorDisabled,
  },
  discipleBoxSectionCheckStyle: {
    marginRight: 0,
    width: '80%',
  },
  discipleBoxSectionUncheckStyle: {
    marginRight: 0,
  },
  checkBoxSectionStyle: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: ProportionateScreenSizeValue(1),
    borderBottomColor: BorderColor,
  },
  textSectionStyle: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  nameSectionStyle: {
    backgroundColor: 'rgba(255,255,255,1)',
    borderBottomWidth: ProportionateScreenSizeValue(2),
    borderBottomColor: '#E7E7E7',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nameTextStyle: {
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(14),
    fontWeight: 'bold',
    color: '#000',
  },
  nameTitleSectionStyle: {
    padding: ProportionateScreenSizeValue(5),
    width: '78%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nameButtonSectionStyle: {
    width: '22%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameButtonInnerSectionStyle: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameButtonStyle: {
    width: ProportionateScreenSizeValue(24),
    height: ProportionateScreenSizeValue(24),
    borderRadius: ProportionateScreenSizeValue(12),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameActiveEnableButtonStyle: {
    backgroundColor: '#08D49A',
  },
  nameActiveDisableButtonStyle: {
    backgroundColor: '#CDCDCD',
  },
  nameInactiveEnableButtonStyle: {
    backgroundColor: 'red',
  },
  nameInactiveDisableButtonStyle: {
    backgroundColor: '#CDCDCD',
  },
  nameInactiveButtonSectionStyle: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  nameButtonTextStyle: {
    fontSize: ProportionateScreenSizeValue(10),
    color: '#FFF',
    lineHeight: ProportionateScreenSizeValue(11),
  },
  descTextStyle: {
    paddingLeft: ProportionateScreenSizeValue(5),
    paddingRight: ProportionateScreenSizeValue(5),
    color: DetailTextColor,
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(10),
    height: ProportionateScreenSizeValue(15),
  },
  descTopTextStyle: {
    paddingTop: ProportionateScreenSizeValue(5),
    height: ProportionateScreenSizeValue(20),
  },
});