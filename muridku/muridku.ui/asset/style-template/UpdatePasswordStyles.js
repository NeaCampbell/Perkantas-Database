/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';
import {
  DefaultInputHeight,
  DefaultInputFontSize,
} from '../asset/style-template/BasicStyles';

export const UpdatePasswordStyles = StyleSheet.create({
  bodyContainerStyle: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  inputSectionStyle: {
    width: '100%',
    height: '25%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ProportionateScreenSizeValue(15),
  },
  inputStyle: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
    width: '100%',
    fontSize: ProportionateScreenSizeValue(12),
    borderWidth: ProportionateScreenSizeValue(1),
    height: ProportionateScreenSizeValue(DefaultInputHeight),
    borderRadius: ProportionateScreenSizeValue(10),
    borderColor: '#DDDDDD',
    paddingLeft: ProportionateScreenSizeValue(15),
    paddingRight: ProportionateScreenSizeValue(15),
  },
  customPasswordInputStyle: {
    fontSize: ProportionateScreenSizeValue(DefaultInputFontSize),
    height: '100%',
    width: '80%',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
  },
  passwordButtonStyle: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  passwordButtonTextStyle: {
    fontSize: ProportionateScreenSizeValue(8),
  },
  inputSeparatorStyle: {
    height: '5%',
  },
  buttonSectionStyle: {
    width: '100%',
    height: '10%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#F59873',
    color: '#FFFFFF',
    height: ProportionateScreenSizeValue(42),
    width: ProportionateScreenSizeValue(250),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(16),
    lineHeight: ProportionateScreenSizeValue(16),
    fontWeight: 'bold',
  },
  customActivityIndicatorStyle: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 99999,
  },
});
