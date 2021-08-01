/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

export const BackgroundColor = '#2A2C4E';
export const HeaderSectionHeight = 7;
export const HeaderOtherSectionHeight = 10;
export const FooterSectionHeight = 11;

export const MenuBasicStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
  },
  headerSectionStyle: {
    flexDirection: 'row',
    height: `${HeaderSectionHeight}%`,
    width: '100%',
    justifyContent: 'flex-start',
    backgroundColor: BackgroundColor,
    zIndex: 3,
  },
  otherHeaderSectionStyle: {
    flexDirection: 'row',
    height: `${HeaderOtherSectionHeight}%`,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: BackgroundColor,
  },
  burgerStyle: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSearchMenuStyle: {
    borderTopWidth: ProportionateScreenSizeValue(1),
    borderTopColor: '#FAFAFA',
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
    color: '#FAFAFA',
  },
  childSectionStyle: {
    width: '100%',
    justifyContent: 'center',
    zIndex: 1,
  },
  footerSectionStyle: {
    width: '100%',
    height: `${FooterSectionHeight}%`,
    justifyContent: 'center',
    zIndex: 2,
  },
});
