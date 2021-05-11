import {
  StyleSheet,
} from 'react-native';
import {
  HeightPercentageToDP
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
  titleContainerStyle: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: HeightPercentageToDP(10),
    borderTopRightRadius: HeightPercentageToDP(10),
    marginTop: HeightPercentageToDP(120)
  },
  titleStyle: {
    color: '#000000',
    fontStyle: 'normal',
    fontSize: HeightPercentageToDP(20),
    textAlign: 'center'
  },
  bodySectionStyle: {
    flexDirection: 'row',
    height: HeightPercentageToDP(40),
    marginTop: HeightPercentageToDP(5),
    marginLeft: HeightPercentageToDP(15),
    marginRight: HeightPercentageToDP(15),
    justifyContent: 'center',
  },
  customInputStyle: {
    flex: 1,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    width: '100%',
    fontSize: HeightPercentageToDP(12),
    borderWidth: HeightPercentageToDP(1),
    borderColor: '#DDDDDD'
  },
  customInputPasswordStyle: {
    flex: 1,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    width: '100%',
    fontSize: HeightPercentageToDP(12)
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
  signupTextStyle: {
    color: '#000000',
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
    color: '#000000',
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