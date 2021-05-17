import { BorderWidth } from 'react-bootstrap-icons';
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue
} from '../../helper/CommonHelper';

const BackgroundColor = "#2A2C4E";

export const DataAKKStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: BackgroundColor,
  },
  searchSectionStyle: {
    flexDirection: 'row',
    height: ProportionateScreenSizeValue(42),
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    marginBottom: ProportionateScreenSizeValue(15),
    justifyContent: 'center',
  },
  searchContainerStyle: {
    color: '#000000',
    backgroundColor: '#FAF9FF',
    width: '100%',
    height: ProportionateScreenSizeValue(42),
    paddingLeft: ProportionateScreenSizeValue(5),
    paddingRight: ProportionateScreenSizeValue(5),
    borderRadius: ProportionateScreenSizeValue(10)
  },
  searchTextStyle: {
    color: '#000000',
    backgroundColor: '#FAF9FF',
    fontSize: ProportionateScreenSizeValue(12),
    width: '95%',
  },
  footerButtonStyle: {
    width: '30%',
    alignItems: 'center',
    justifyContent:'flex-start',
    marginTop: 15
  },
  buttonStyle: {
    backgroundColor: '#74B973',
    color: '#FFFFFF',
    height: ProportionateScreenSizeValue(120),
    width: ProportionateScreenSizeValue(120),
    alignItems: 'center',
    marginTop: ProportionateScreenSizeValue(10),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  buttonFooterStyle: {
    backgroundColor: '#F59873',
    color: '#FFFFFF',
    height: ProportionateScreenSizeValue(42),
    width: ProportionateScreenSizeValue(250),
    alignItems: 'center',
    marginTop: ProportionateScreenSizeValue(0),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
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
  nameButtonTextStyle: {
    color: '#3A2A6E',
    paddingVertical: 8,
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 10,
  },
  bodySectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 5,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
  },
  photoStyle: {
    width: '55%',
    height: 95,
    resizeMode: 'center'
  },
  welcomingTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontStyle: 'normal',
    fontSize: 25,
    lineHeight: 10,
  },
  accTypeTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 10,
  },
  descTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 10,
    marginTop: 150
  },
  welcomingTextSectionStyle: {
    flexDirection: 'column',
    height: 40,
    marginTop: 10,
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 15,
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 15,
    fontWeight: 'bold',
  },
  formStyle:{
    color: '#F4F8FC',
    backgroundColor: '#FFFFFF',
    width: '90%',
    fontSize: 12,
    borderWidth: 2,
    borderColor: '#D1D5E0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  formSectionStyle:{
    backgroundColor: '#FFFFFF',
    marginTop: 75,
    marginBottom: 50,
    paddingBottom: 100,
  },
});