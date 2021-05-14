import {
  StyleSheet
} from 'react-native';
import {
  ProportionateScreenSizeValue
} from '../../helper/CommonHelper';

export const BackgroundColor = "#2A2C4E";

export const MenuBasicStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: BackgroundColor
  },
  headerSectionStyle: {
    flexDirection: 'row',
    height: ProportionateScreenSizeValue(40),
    width: '100%',
    position: 'absolute',
  },
  burgerStyle: {
    width: '15%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  burgerIconStyle: {
    marginTop: ProportionateScreenSizeValue(12),
    marginLeft: ProportionateScreenSizeValue(12),
    width: '40%',
    height: '40%',
    resizeMode: 'contain'
  },
  titleStyle: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
  titleTextStyle: {
    textAlign: 'center',
    fontSize: ProportionateScreenSizeValue(16),
    color: '#FFF',
  },
  childContainerStyle: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    marginTop: ProportionateScreenSizeValue(40),
  },
  footerContainerStyle: {
    width: '100%',
    height: '13%',
    justifyContent: 'center'
  },
});