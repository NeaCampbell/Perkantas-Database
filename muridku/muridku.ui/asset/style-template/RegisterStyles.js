/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';
import {
  DefaultInputFontSize,
  DefaultPasswordInputHeight,
} from './BasicStyles';

export const BackgroundColor = '#2A2C4E';

export const RegisterStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BackgroundColor,
  },
  logoContainerStyle: {
    width: '100%',
    height: ProportionateScreenSizeValue(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  formContainerStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  formContainerContentStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  titleContainerStyle: {
    height: ProportionateScreenSizeValue(40),
    marginTop: ProportionateScreenSizeValue(40),
    width: '70%',
    paddingLeft: ProportionateScreenSizeValue(15),
    paddingRight: ProportionateScreenSizeValue(15),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: ProportionateScreenSizeValue(10),
    borderTopRightRadius: ProportionateScreenSizeValue(10),
  },
  titleStyle: {
    color: '#000000',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(20),
    textAlign: 'center',
    paddingTop: ProportionateScreenSizeValue(10),
  },
  formInputContainerStyle: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: ProportionateScreenSizeValue(280),
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: ProportionateScreenSizeValue(10),
  },
  formInputSectionStyle: {
    flexDirection: 'row',
    height: ProportionateScreenSizeValue(40),
    width: '100%',
    marginTop: ProportionateScreenSizeValue(5),
    paddingLeft: ProportionateScreenSizeValue(15),
    paddingRight: ProportionateScreenSizeValue(15),
    justifyContent: 'center',
  },
  bodySectionStyle: {
    flexDirection: 'row',
    height: ProportionateScreenSizeValue(40),
    width: '100%',
    paddingLeft: ProportionateScreenSizeValue(15),
    paddingRight: ProportionateScreenSizeValue(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  customInputStyle: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
    width: '100%',
    fontSize: ProportionateScreenSizeValue(12),
    borderWidth: ProportionateScreenSizeValue(1),
    borderColor: '#DDDDDD',
  },
  customPasswordContainerStyle: {
    height: ProportionateScreenSizeValue(DefaultPasswordInputHeight),
  },
  customPasswordInputStyle: {
    fontSize: ProportionateScreenSizeValue(DefaultInputFontSize),
    height: ProportionateScreenSizeValue(32),
    width: '80%',
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  passwordButtonStyle: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordButtonTextStyle: {
    fontSize: ProportionateScreenSizeValue(8),
  },
  buttonContainerStyle: {
    backgroundColor: '#FFF',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSubmitStyle: {
    backgroundColor: '#E37550',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSubmitDisableStyle: {
    backgroundColor: 'rgba(227, 117, 80, 0.6)',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: ProportionateScreenSizeValue(8),
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(14),
    lineHeight: ProportionateScreenSizeValue(17),
  },
  loginContainerStyle: {
    flexDirection: 'row',
    height: ProportionateScreenSizeValue(40),
    width: '100%',
    marginTop: ProportionateScreenSizeValue(10),
    paddingLeft: ProportionateScreenSizeValue(15),
    paddingRight: ProportionateScreenSizeValue(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTextStyle: {
    color: '#000000',
    textAlign: 'center',
    fontSize: ProportionateScreenSizeValue(12),
  },
  loginTextButtonStyle: {
    color: '#E37550',
    textAlign: 'center',
    fontSize: ProportionateScreenSizeValue(12),
  },
  errorTextStyle: {
    color: '#FF4D05',
    textAlign: 'center',
    fontSize: ProportionateScreenSizeValue(12),
    fontStyle: 'italic',
  },
  techProblemDescStyle: {
    fontSize: ProportionateScreenSizeValue(12),
    lineHeight: ProportionateScreenSizeValue(17),
    color: '#000000',
  },
  techProblemStyle: {
    fontSize: ProportionateScreenSizeValue(12),
    lineHeight: ProportionateScreenSizeValue(17),
    color: '#FF4D05',
    textDecorationLine: 'underline',
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
