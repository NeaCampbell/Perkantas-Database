import {
  StyleSheet,
} from 'react-native';
import {
  HeightPercentageToDP
} from '../../helper/CommonHelper';

export const BackgroundColor = "#2A2C4E";

export const LoginStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: BackgroundColor
  },
  logoContainerStyle: {
    width: '100%',
    height: HeightPercentageToDP(125),
    alignItems: 'center',
    position: 'absolute'
  },
  logoStyle: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  bodySectionStyle: {
    height: HeightPercentageToDP(40),
    marginTop: HeightPercentageToDP(5),
    marginLeft: HeightPercentageToDP(15),
    marginRight: HeightPercentageToDP(15),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    backgroundColor: '#E37550',
    color: '#FFFFFF',
    height: HeightPercentageToDP(35),
    width: '100%',
    alignItems: 'center',
    marginTop: HeightPercentageToDP(10)
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: HeightPercentageToDP(8),
    fontStyle: 'normal',
    fontSize: HeightPercentageToDP(14),
    lineHeight: HeightPercentageToDP(17),
  },
  forgotPwdTextStyle: {
    color: '#E37550',
    textAlign: 'center',
    fontStyle: 'normal',
    fontSize: HeightPercentageToDP(12),
    alignSelf: 'center'
  },
  signupTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: HeightPercentageToDP(12)
  },
  signupTextButtonStyle: {
    color: '#E37550',
    textAlign: 'center',
    fontSize: HeightPercentageToDP(12)
  },
  errorTextStyle: {
    color: '#FF4D05',
    textAlign: 'center',
    fontSize: HeightPercentageToDP(12),
    fontStyle: 'italic',
  },
  techProblemDescStyle: {
    fontSize: HeightPercentageToDP(12),
    lineHeight: HeightPercentageToDP(17),
    color: 'white',
  },
  techProblemStyle: {
    fontSize: HeightPercentageToDP(12),
    lineHeight: HeightPercentageToDP(17),
    color: '#FF4D05',
    textDecorationLine: 'underline',
  },
  customActivityIndicatorStyle: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
  },
});