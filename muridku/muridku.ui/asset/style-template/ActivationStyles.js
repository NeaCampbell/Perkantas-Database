/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

export const ActivationStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  searchSectionStyle: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    borderRadius: ProportionateScreenSizeValue(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSectionContainerStyle: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ProportionateScreenSizeValue(10),
    marginLeft: ProportionateScreenSizeValue(5),
    marginRight: ProportionateScreenSizeValue(5),
    height: '70%',
    backgroundColor: 'white',
  },
  searchTextStyle: {
    marginLeft: ProportionateScreenSizeValue(7),
    marginRight: ProportionateScreenSizeValue(8),
    width: '75%',
    backgroundColor: 'white',
    color: 'black',
  },
  searchButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: ProportionateScreenSizeValue(2),
    borderLeftColor: '#DDD',
    height: '70%',
    width: '15%',
  },
  searchButtonTextStyle: {
    fontSize: ProportionateScreenSizeValue(12),
    color: '#000',
  },
  footerViewStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#FAFAFA',
    // marginTop: ProportionateScreenSizeValue(15),
  },
  buttonFooterStyle: {
    backgroundColor: '#F59873',
    color: '#FAFAFA',
    height: ProportionateScreenSizeValue(42),
    width: ProportionateScreenSizeValue(250),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFooterEnableStyle: {
    backgroundColor: '#F59873',
    color: '#FAFAFA',
  },
  buttonFooterDisableStyle: {
    backgroundColor: 'rgba(245, 152, 115, 0.5)',
    color: '#FAFAFA',
  },
  submitButtonTextStyle: {
    color: '#FAFAFA',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(16),
    lineHeight: ProportionateScreenSizeValue(16),
    fontWeight: 'bold',
  },
  customActivityIndicatorStyle: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 99999,
  },
});
