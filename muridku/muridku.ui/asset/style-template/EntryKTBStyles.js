/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

const NextColor = '#815BF0';
const NextInverseColor = '#FFF';

export const EntryKTBStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  boxSectionStyle: {
    width: '90%',
    height: ProportionateScreenSizeValue(180),
    borderRadius: ProportionateScreenSizeValue(10),
    marginBottom: ProportionateScreenSizeValue(200),
    backgroundColor: 'rgba(255, 255, 255, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    shadowOpacity: 0.5,
    shadowRadius: ProportionateScreenSizeValue(20),
    shadowColor: '#000',
    elevation: ProportionateScreenSizeValue(20),
  },
  titleSectionStyle: {
    width: '100%',
    height: ProportionateScreenSizeValue(30),
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: '8%',
  },
  titleTextStyle: {
    fontSize: ProportionateScreenSizeValue(16),
    color: '#000',
  },
  inputSectionStyle: {
    width: '100%',
    height: ProportionateScreenSizeValue(70),
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    width: '85%',
    height: ProportionateScreenSizeValue(40),
    fontSize: ProportionateScreenSizeValue(14),
    paddingHorizontal: ProportionateScreenSizeValue(10),
    borderWidth: ProportionateScreenSizeValue(1),
    borderRadius: ProportionateScreenSizeValue(10),
    borderColor: '#AAA',
  },
  buttonSectionStyle: {
    width: '100%',
    height: ProportionateScreenSizeValue(50),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInnerSectionStyle: {
    width: '50%',
    height: ProportionateScreenSizeValue(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    width: '70%',
    height: ProportionateScreenSizeValue(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNextStyle: {
    backgroundColor: NextColor,
    fontSize: ProportionateScreenSizeValue(12),
  },
  buttonNextTextStyle: {
    color: NextInverseColor,
    fontSize: ProportionateScreenSizeValue(12),
  },
  buttonCancelStyle: {
    backgroundColor: NextInverseColor,
    borderWidth: ProportionateScreenSizeValue(1),
    borderColor: NextColor,
  },
  buttonCancelTextStyle: {
    color: NextColor,
    fontSize: ProportionateScreenSizeValue(12),
  },
});
