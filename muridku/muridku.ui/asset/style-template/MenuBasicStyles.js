/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  WindowSize,
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

export const BackgroundColor = '#2A2C4E';

export const MenuBasicStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: BackgroundColor,
  },
  headerSectionStyle: {
    flexDirection: 'row',
    height: WindowSize.height * 7 / 100,
    width: '100%',
    justifyContent: 'flex-start',
  },
  otherHeaderSectionStyle: {
    flexDirection: 'row',
    height: WindowSize.height * 7 / 100,
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    marginBottom: ProportionateScreenSizeValue(15),
    justifyContent: 'center',
  },
  burgerStyle: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSearchMenuStyle: {
    borderTopWidth: ProportionateScreenSizeValue(1),
    borderTopColor: '#FFF',
    width: '40%',
  },
  headerSearchMenuDistStyle: {
    marginBottom: ProportionateScreenSizeValue(4),
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
  childSectionStyle: {
    width: '100%',
    justifyContent: 'center',
  },
  footerSectionStyle: {
    width: '100%',
    height: WindowSize.height * 11 / 100,
    justifyContent: 'center',
  },
});
