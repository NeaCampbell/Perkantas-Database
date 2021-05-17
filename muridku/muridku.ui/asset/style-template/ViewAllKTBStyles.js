import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue
} from '../../helper/CommonHelper';

const BackgroundColor = "#2A2C4E";

export const ViewAllKTBStyles = StyleSheet.create({
  headerStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: BackgroundColor,
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
    opacity: 1,
    color: '#FFF',
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
    opacity: 1,
    color: '#FFF',
  },
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
    width: '50%',
    alignItems: 'center',
    justifyContent:'flex-start'
  },
  buttonStyle: {
    backgroundColor: '#815BF0',
    color: '#FFFFFF',
    height: ProportionateScreenSizeValue(35),
    width: ProportionateScreenSizeValue(35),
    alignItems: 'center',
    marginTop: ProportionateScreenSizeValue(10),
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