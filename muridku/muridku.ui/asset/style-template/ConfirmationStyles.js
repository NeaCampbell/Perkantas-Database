/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

const ConfirmColor = '#815BF0';
const AlertColor = '#B80909';

export const ConfirmationStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBoxSectionStyle: {
    width: '90%',
    height: ProportionateScreenSizeValue(140),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: ProportionateScreenSizeValue(10),
    shadowOpacity: 0.5,
    shadowRadius: ProportionateScreenSizeValue(20),
    shadowColor: '#000',
    elevation: ProportionateScreenSizeValue(20),
  },
  messageBoxTextSectionStyle: {
    width: '100%',
    paddingHorizontal: '8%',
    height: ProportionateScreenSizeValue(70),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBoxTextStyle: {
    fontSize: ProportionateScreenSizeValue(14),
    color: '#000',
  },
  messageBoxButtonSectionStyle: {
    width: '100%',
    height: ProportionateScreenSizeValue(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBoxButtonInnerSectionStyle: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBoxButtonStyle: {
    width: '70%',
    height: ProportionateScreenSizeValue(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBoxButtonConfirmStyle: {
    backgroundColor: ConfirmColor,
  },
  messageBoxButtonAlertStyle: {
    backgroundColor: AlertColor,
  },
  messageBoxButtonTextStyle: {
    color: '#FFF',
    fontSize: ProportionateScreenSizeValue(12),
  },
  messageBoxButtonConfirmInverseStyle: {
    borderWidth: ProportionateScreenSizeValue(1),
    borderColor: ConfirmColor,
    backgroundColor: '#FFF',
  },
  messageBoxButtonAlertInverseStyle: {
    borderWidth: ProportionateScreenSizeValue(1),
    borderColor: AlertColor,
    backgroundColor: '#FFF',
  },
  messageBoxButtonTextConfirmInverseStyle: {
    color: ConfirmColor,
    fontSize: ProportionateScreenSizeValue(12),
  },
  messageBoxButtonTextAlertInverseStyle: {
    color: AlertColor,
    fontSize: ProportionateScreenSizeValue(12),
  },
});
