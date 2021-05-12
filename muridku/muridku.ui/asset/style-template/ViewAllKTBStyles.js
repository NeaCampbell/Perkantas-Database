import {
  StyleSheet,
} from 'react-native';
import {
  HeightPercentageToDP
} from '../../helper/CommonHelper';

const BackgroundColor = "#2A2C4E";

export const ViewAllKTBStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: BackgroundColor
  },
  logoContainerStyle: {
    width: '100%',
    height: '100%'
  },
  logoStyle: {
    width: '100%',
    height: HeightPercentageToDP(100),
    resizeMode: 'center'
  },
  burgerSectionStyle: {
    flexDirection: 'row',
    height: HeightPercentageToDP(40),
    marginTop: HeightPercentageToDP(15),
    marginLeft: HeightPercentageToDP(10),
    marginRight: HeightPercentageToDP(10),
  },
  searchSectionStyle: {
    flexDirection: 'row',
    height: HeightPercentageToDP(42),
    marginTop: HeightPercentageToDP(30),
    marginLeft: HeightPercentageToDP(15),
    marginRight: HeightPercentageToDP(15),
  },
  ktbBoxSectionStyle: {
    flexDirection: 'column',
    height: HeightPercentageToDP(135),
    marginTop: HeightPercentageToDP(10),
    marginLeft: HeightPercentageToDP(15),
    marginRight: HeightPercentageToDP(15),
    padding: HeightPercentageToDP(10),
    justifyContent: 'space-between',
    color: '#000000',
    backgroundColor: '#FFF9F9',
  },
  iconUser: {
    width: HeightPercentageToDP(40),
    height: HeightPercentageToDP(40),
    marginLeft: (-7),
    borderRadius: HeightPercentageToDP(20),
    backgroundColor:'#D8D8D8',
  },
  burgerStyle: {
    width: HeightPercentageToDP(15),
    height: HeightPercentageToDP(15),
    resizeMode: 'left'
  },
  nextStyle: {
    width: HeightPercentageToDP(15),
    height: HeightPercentageToDP(15),
    resizeMode: 'right'
  },
  searchButtonStyle: {
    width: HeightPercentageToDP(41),
    height: HeightPercentageToDP(42),
    marginLeft: HeightPercentageToDP(1),
    resizeMode: 'right',
    backgroundColor: '#FAF9FF',
  },
  loginTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: HeightPercentageToDP(14)
  },
  searchInputStyle: {
    //flex: 1,
    color: '#000000',
    backgroundColor: '#FAF9FF',
    width: '100%',
    height: HeightPercentageToDP(42),
    fontSize: HeightPercentageToDP(12),
    paddingLeft: HeightPercentageToDP(5),
    paddingRight: HeightPercentageToDP(5),
  },
  bodySectionStyle: {
    flexDirection: 'row',
    height: HeightPercentageToDP(40),
    marginTop: HeightPercentageToDP(5),
    marginLeft: HeightPercentageToDP(15),
    marginRight: HeightPercentageToDP(15),
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#E37550',
    color: '#FFFFFF',
    height: HeightPercentageToDP(35),
    width: HeightPercentageToDP(35),
    alignItems: 'center',
    marginTop: HeightPercentageToDP(10),
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
    cursor: 'pointer',
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