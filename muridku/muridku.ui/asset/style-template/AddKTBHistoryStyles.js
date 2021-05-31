/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';

const BackgroundColor = '#FFFFFF';

export const AddKTBHistoryStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: BackgroundColor,
  },
  logoContainerStyle: {
    width: '100%',
    height: '100%',
  },
  logoStyle: {
    width: '100%',
    height: 100,
    resizeMode: 'center',
  },
  bodySectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#E37550',
    color: '#FFFFFF',
    height: 35,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 8,
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 17,
  },
  forgotPwdTextStyle: {
    color: '#E37550',
    textAlign: 'center',
    fontStyle: 'normal',
    fontSize: 12,
    alignSelf: 'center',
  },
  signupTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 12,
  },
  signupTextButtonStyle: {
    color: '#E37550',
    textAlign: 'center',
    fontSize: 12,
  },
  errorTextStyle: {
    color: '#FF4D05',
    textAlign: 'center',
    fontSize: 12,
    fontStyle: 'italic',
  },
  techProblemDescStyle: {
    fontSize: 12,
    lineHeight: 17,
    color: 'white',
  },
  techProblemStyle: {
    fontSize: 12,
    lineHeight: 17,
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
  },
});
