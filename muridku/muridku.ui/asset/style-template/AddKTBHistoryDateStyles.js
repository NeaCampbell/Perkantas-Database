/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

export const AddKTBHistoryDateStyles = StyleSheet.create({
  bodyDateContainerStyle: {
    width: '100%',
    paddingVertical: ProportionateScreenSizeValue(5),
  },
  bodyDateContainerContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateDatePickerSectionStyle: {
    borderBottomWidth: 1,
    width: '85%',
    height: ProportionateScreenSizeValue(150),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateViewSectionStyle: {
    width: '85%',
    height: ProportionateScreenSizeValue(150),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dateViewButtonSectionStyle: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  dateViewButtonStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    zIndex: 2,
  },
  dateViewButtonTextStyle: {
    textDecorationLine: 'underline',
    fontSize: ProportionateScreenSizeValue(10),
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#08D49A',
  },
  dateViewInfoSectionStyle: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateViewInfoTextStyle: {
    fontSize: ProportionateScreenSizeValue(20),
    fontStyle: 'italic',
    color: '#000',
  },
});
