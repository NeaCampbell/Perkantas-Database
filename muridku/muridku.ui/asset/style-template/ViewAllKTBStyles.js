/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

const ButtonColor = '#815BF0';

export const ViewAllKTBStyles = StyleSheet.create({
  headerStyle: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  headerCancelStyle: {
    width: '50%',
    height: '100%',
    marginTop: ProportionateScreenSizeValue(12),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerCancelTextStyle: {
    fontSize: ProportionateScreenSizeValue(12),
    marginLeft: ProportionateScreenSizeValue(12),
    textDecorationLine: 'underline',
    color: 'rgba(255, 255, 255, 1)',
  },
  headerSelectAllStyle: {
    width: '50%',
    height: '100%',
    marginTop: ProportionateScreenSizeValue(12),
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  headerSelectAllTextStyle: {
    fontSize: ProportionateScreenSizeValue(12),
    marginRight: ProportionateScreenSizeValue(12),
    textDecorationLine: 'underline',
    color: 'rgba(255, 255, 255, 1)',
  },
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    paddingVertical: ProportionateScreenSizeValue(12),
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
  footerSectionStyle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonSectionStyle: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonStyle: {
    height: ProportionateScreenSizeValue(36),
    width: ProportionateScreenSizeValue(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ProportionateScreenSizeValue(18),
  },
  buttonEnableStyle: {
    borderWidth: ProportionateScreenSizeValue(1),
    borderColor: ButtonColor,
  },
  buttonDisableStyle: {
    borderWidth: ProportionateScreenSizeValue(1),
    borderColor: 'rgba(129, 91, 240, 0.5)',
  },
  buttonTextStyle: {
    fontSize: ProportionateScreenSizeValue(12),
  },
  buttonTextEnableStyle: {
    color: ButtonColor,
    fontWeight: 'bold',
  },
  buttonTextDisableStyle: {
    color: 'rgba(129, 91, 240, 0.5)',
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
