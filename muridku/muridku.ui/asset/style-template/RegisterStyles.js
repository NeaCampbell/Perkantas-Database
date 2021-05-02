import {
  StyleSheet,
} from 'react-native';

const BackgroundColor = "#2A2C4E";

export const RegisterStyles = StyleSheet.create({
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
    height: 100,
    resizeMode: 'center'
  },
  titleContainerStyle: {
    width: '100%',
    height: '100%',
    marginTop: 50,
  },
  titleStyle: {
    color: '#000000',
    fontStyle: 'normal',
    fontSize: 20,
    textAlign: 'center'
  },
  bodySectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
  },
  customInputStyle: {
    flex: 1,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    width: '100%',
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#DDDDDD'
  },
  customInputPasswordStyle: {
    flex: 1,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    width: '100%',
    fontSize: 12
  },
  buttonStyle: {
    backgroundColor: BackgroundColor,
    color: '#FFFFFF',
    height: 35,
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 8,
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 17,
  },
  signupTextStyle: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 12
  },
  signupTextButtonStyle: {
    color: '#E37550',
    textAlign: 'center',
    fontSize: 12
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