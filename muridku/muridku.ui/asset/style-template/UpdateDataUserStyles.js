/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

export const UpdateDataUserStyles = StyleSheet.create({
  bodyContainerStyle: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  mainButtonSectionStyle: {
    height: '30%',
    width: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonStyle: {
    width: '100%',
    height: '35%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#366BC6',
  },
  mainButtonTextStyle: {
    fontSize: ProportionateScreenSizeValue(16),
    lineHeight: ProportionateScreenSizeValue(16),
    color: '#FFF',
  },
  mainButtonSeparatorStyle: {
    width: '100%',
    height: '10%',
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
