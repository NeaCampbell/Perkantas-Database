import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue
} from '../../helper/CommonHelper';

export const BackgroundColor = "#2A2C4E";

export const RegisterStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: BackgroundColor
  },
  logoContainerStyle: {
    width: '100%',
    height: ProportionateScreenSizeValue(125),
    alignItems: 'center',
    position: 'absolute'
  },
  logoStyle: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  titleContainerStyle: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: ProportionateScreenSizeValue(10),
    borderTopRightRadius: ProportionateScreenSizeValue(10),
    marginTop: ProportionateScreenSizeValue(120)
  },
  titleStyle: {
    color: '#000000',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(20),
    textAlign: 'center'
  },
  bodySectionStyle: {
    flexDirection: 'row',
    height: ProportionateScreenSizeValue(40),
    marginTop: ProportionateScreenSizeValue(5),
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    justifyContent: 'center',
  },
  customInputStyle: {
    flex: 1,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    width: '100%',
    fontSize: ProportionateScreenSizeValue(12),
    borderWidth: ProportionateScreenSizeValue(1),
    borderColor: '#DDDDDD'
  },
  customInputPasswordStyle: {
    flex: 1,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    width: '100%',
    fontSize: ProportionateScreenSizeValue(12)
  },
  buttonStyle: {
    backgroundColor: '#E37550',
    color: '#FFFFFF',
    height: ProportionateScreenSizeValue(35),
    width: '100%',
    alignItems: 'center',
    marginTop: ProportionateScreenSizeValue(10)
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: ProportionateScreenSizeValue(8),
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(14),
    lineHeight: ProportionateScreenSizeValue(17),
  },
  signupTextStyle: {
    color: '#000000',
    textAlign: 'center',
    fontSize: ProportionateScreenSizeValue(12)
  },
  signupTextButtonStyle: {
    color: '#E37550',
    textAlign: 'center',
    fontSize: ProportionateScreenSizeValue(12)
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
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
  },
});