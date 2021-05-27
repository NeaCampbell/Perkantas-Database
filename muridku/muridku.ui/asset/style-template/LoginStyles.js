/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

export const BackgroundColor = '#2A2C4E';

export const LoginStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: BackgroundColor,
  },
  logoContainerStyle: {
    width: '100%',
    height: ProportionateScreenSizeValue(125),
    alignItems: 'center',
    position: 'absolute',
  },
  logoStyle: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  bodySectionStyle: {
    height: ProportionateScreenSizeValue(40),
    marginTop: ProportionateScreenSizeValue(5),
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#E37550',
    color: '#FFFFFF',
    height: ProportionateScreenSizeValue(35),
    width: '100%',
    alignItems: 'center',
    marginTop: ProportionateScreenSizeValue(10),
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: ProportionateScreenSizeValue(8),
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(14),
    lineHeight: ProportionateScreenSizeValue(17),
  },
  forgotPwdTextStyle: {
    color: '#E37550',
    textAlign: 'center',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(12),
    alignSelf: 'center',
  },
  signupTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: ProportionateScreenSizeValue(12),
  },
  signupTextButtonStyle: {
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
    color: 'white',
  },
  techProblemStyle: {
    fontSize: ProportionateScreenSizeValue(12),
    lineHeight: ProportionateScreenSizeValue(17),
    color: '#FF4D05',
    textDecorationLine: 'underline',
  },
});
