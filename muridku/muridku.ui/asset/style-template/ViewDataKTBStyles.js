import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue
} from '../../helper/CommonHelper';

const BackgroundColor = "#2A2C4E";

export const ViewDataKTBStyles = StyleSheet.create({
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
    justifyContent: 'center'
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
    justifyContent:'flex-start'
  },
  buttonStyle: {
    backgroundColor: '#FFFFFF',
    color: '#FFFFFF',
    height: ProportionateScreenSizeValue(120),
    width: ProportionateScreenSizeValue(120),
    alignItems: 'center',
    marginTop: ProportionateScreenSizeValue(10),
    borderTopLeftRadius: ProportionateScreenSizeValue(10),
    borderTopRightRadius: ProportionateScreenSizeValue(10),
    borderBottomLeftRadius: ProportionateScreenSizeValue(10),
    borderBottomRightRadius: ProportionateScreenSizeValue(10),
    justifyContent: 'center',
  },
  buttonFooterStyle: {
    backgroundColor: '#815BF0',
    color: '#FFFFFF',
    height: ProportionateScreenSizeValue(42),
    width: ProportionateScreenSizeValue(42),
    alignItems: 'center',
    marginTop: ProportionateScreenSizeValue(0),
    borderTopLeftRadius: ProportionateScreenSizeValue(10),
    borderTopRightRadius: ProportionateScreenSizeValue(10),
    borderBottomLeftRadius: ProportionateScreenSizeValue(10),
    borderBottomRightRadius: ProportionateScreenSizeValue(10)
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
    paddingVertical: ProportionateScreenSizeValue(2),
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(12),
    lineHeight: ProportionateScreenSizeValue(10),
  },
  cityButtonTextStyle: {
    color: '#3A2A6E',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(12),
    lineHeight: ProportionateScreenSizeValue(12),
  },
  bodySectionStyle: {
    flexDirection: 'row',
    height: ProportionateScreenSizeValue(40),
    marginTop: ProportionateScreenSizeValue(5),
    marginLeft: 0,
    marginRight: 0,
    justifyContent: 'center',
  },
  photoStyle: {
    width: '45%',
    height: ProportionateScreenSizeValue(80),
    resizeMode: 'center'
  },
});