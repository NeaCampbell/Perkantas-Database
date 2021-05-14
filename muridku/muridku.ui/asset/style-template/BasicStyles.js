import {
  StyleSheet,
  Platform
} from 'react-native';
import {
  ProportionateScreenSizeValue
} from '../../helper/CommonHelper';

export const BasicColor = '#F59873';
export const DefaultInputFontSize = 12;
export const DefaultInputHeight = 35;
export const DefaultPasswordInputHeight = 30;

export const BasicStyles = StyleSheet.create({
  mainBodyStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  globalFontStyle: {
    fontFamily: 'arial',
  },
  mainBodyImageStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  mainBodyImageCoverStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  titleInputStyle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: ProportionateScreenSizeValue(14),
    lineHeight: ProportionateScreenSizeValue(17),
    color: BasicColor,
  },
  basicInputStyle: {
    color: '#F4F8FC',
    backgroundColor: '#555671',
    width: '100%',
    fontSize: ProportionateScreenSizeValue(DefaultInputFontSize),
  },
  inputStyle: {
    paddingLeft: ProportionateScreenSizeValue(15),
    paddingRight: ProportionateScreenSizeValue(15),
    height: ProportionateScreenSizeValue(DefaultInputHeight),
    position: 'absolute'
  },
  passwordInputStyle: {
    height: ProportionateScreenSizeValue(DefaultPasswordInputHeight),
  },
});

export const LoadingViewSize = Platform.OS === 'android' ? ProportionateScreenSizeValue(30) : 'large';
export const ContainerImageCoverColor = ['rgba(255,255,255,0.5)', 'rgba(250,231,224,0.8)'];
export const InputWrapperColor = ['rgba(255,255,255,0.5)', 'rgba(250,231,224,1)'];
export const PlaceholderTextColor = '#AAA';