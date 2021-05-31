/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';
import {
  DefaultInputHeight,
  PlaceholderTextColor,
  DefaultInputFontSize,
} from './BasicStyles';

const BackgroundColor = '#2A2C4E';

export const DataAKKStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: BackgroundColor,
    flexDirection: 'column',
  },
  welcomingSectionStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  welcomingTextStyle: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(25),
  },
  accTypeTextStyle: {
    color: '#FFFFFF',
    paddingVertical: ProportionateScreenSizeValue(10),
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(14),
  },
  instSectionStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '32%',
  },
  buttonStyle: {
    backgroundColor: '#03ad7d',
    height: ProportionateScreenSizeValue(30),
    width: ProportionateScreenSizeValue(85),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonUnselectedStyle: {
    height: ProportionateScreenSizeValue(30),
    width: ProportionateScreenSizeValue(85),
    borderWidth: ProportionateScreenSizeValue(1),
    borderColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameButtonTextStyle: {
    color: '#FFF',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: ProportionateScreenSizeValue(10),
  },
  nameButtonUselectedTextStyle: {
    color: '#CCC',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(10),
  },
  photoStyle: {
    width: '55%',
    height: ProportionateScreenSizeValue(40),
    resizeMode: 'center',
  },
  formSectionStyle:{
    backgroundColor: '#FFFFFF',
    marginTop: ProportionateScreenSizeValue(15),
  },
  formBodySectionStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: ProportionateScreenSizeValue(DefaultInputHeight),
    marginVertical: ProportionateScreenSizeValue(5),
  },
  formStyle: {
    color: '#000',
    backgroundColor: '#FFFFFF',
    width: '90%',
    fontSize: ProportionateScreenSizeValue(12),
    borderWidth: ProportionateScreenSizeValue(1.5),
    borderColor: '#D1D5E0',
    borderTopLeftRadius: ProportionateScreenSizeValue(10),
    borderTopRightRadius: ProportionateScreenSizeValue(10),
    borderBottomLeftRadius: ProportionateScreenSizeValue(10),
    borderBottomRightRadius: ProportionateScreenSizeValue(10),
  },
  dropDownContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    borderColor: '#D1D5E0',
    borderRadius: 0,
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
  },
  dropDownPlaceholderStyle: {
    width: '80%',
    fontSize: ProportionateScreenSizeValue(DefaultInputFontSize),
    color: PlaceholderTextColor,
  },
  dropDownStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  dropDownItemStyle: {
    fontSize: ProportionateScreenSizeValue(DefaultInputFontSize),
  },
  dropDownSearchContainerStyle: {
    width: '100%',
    borderWidth: 0,
  },
  dropDownSearchInputStyle: {
    color: '#000',
    fontSize: ProportionateScreenSizeValue(DefaultInputFontSize),
  },
  customActivityIndicatorStyle: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  footerViewStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#FFF',
    // marginTop: ProportionateScreenSizeValue(15),
  },
  buttonFooterStyle: {
    backgroundColor: '#F59873',
    color: '#FFFFFF',
    height: ProportionateScreenSizeValue(42),
    width: ProportionateScreenSizeValue(250),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonTextStyle: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(16),
    lineHeight: ProportionateScreenSizeValue(15),
    fontWeight: 'bold',
  },
});
