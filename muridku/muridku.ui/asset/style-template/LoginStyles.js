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
  emailSectionStyle: {
    height: ProportionateScreenSizeValue(40),
    marginTop: ProportionateScreenSizeValue(150),
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordSectionStyle: {
    height: ProportionateScreenSizeValue(40),
    marginTop: ProportionateScreenSizeValue(5),
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    justifyContent: 'center',
    alignItems: 'center',
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
  stayLoggedInSectionStyle: {
    height: ProportionateScreenSizeValue(20),
    marginTop: ProportionateScreenSizeValue(5),
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stayLoggedInInnerStyle: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: ProportionateScreenSizeValue(5),
  },
  stayLoggedInCheckBoxStyle: {
    width: ProportionateScreenSizeValue(18),
    height: ProportionateScreenSizeValue(18),
    borderRadius: ProportionateScreenSizeValue(3),
    borderWidth: ProportionateScreenSizeValue(1),
    borderColor: 'gray',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stayLoggedInCheckBoxActiveStyle: {
    width: ProportionateScreenSizeValue(18),
    height: ProportionateScreenSizeValue(18),
    borderRadius: ProportionateScreenSizeValue(3),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stayLoggedInCheckBoxActiveInnerStyle: {
    fontSize: ProportionateScreenSizeValue(12),
    fontWeight: 'bold',
    color: 'black',
  },
  stayLoggedInTextContainerStyle: {
    marginLeft: ProportionateScreenSizeValue(5),
  },
  stayLoggedInTextStyle: {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: ProportionateScreenSizeValue(14),
  },
  stayLoggedInTextActiveStyle: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: ProportionateScreenSizeValue(14),
  },
  loginButtonSectionStyle: {
    height: ProportionateScreenSizeValue(40),
    marginTop: ProportionateScreenSizeValue(5),
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonStyle: {
    backgroundColor: '#E37550',
    color: '#FFFFFF',
    height: ProportionateScreenSizeValue(35),
    width: '100%',
    alignItems: 'center',
    marginTop: ProportionateScreenSizeValue(10),
  },
  loginButtonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: ProportionateScreenSizeValue(8),
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(14),
    lineHeight: ProportionateScreenSizeValue(17),
  },
  forgotPwdSectionStyle: {
    height: ProportionateScreenSizeValue(20),
    marginTop: ProportionateScreenSizeValue(10),
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  forgotPwdTextStyle: {
    color: '#E37550',
    textAlign: 'center',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(12),
    alignSelf: 'center',
  },
  signupSectionStyle: {
    height: ProportionateScreenSizeValue(20),
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
  techProblemDescSectionStyle: {
    height: ProportionateScreenSizeValue(170),
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  techProblemDescStyle: {
    fontSize: ProportionateScreenSizeValue(12),
    lineHeight: ProportionateScreenSizeValue(17),
    color: 'white',
  },
  techProblemSectionStyle: {
    height: ProportionateScreenSizeValue(20),
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  techProblemStyle: {
    fontSize: ProportionateScreenSizeValue(12),
    lineHeight: ProportionateScreenSizeValue(17),
    color: '#FF4D05',
    textDecorationLine: 'underline',
  },
});
