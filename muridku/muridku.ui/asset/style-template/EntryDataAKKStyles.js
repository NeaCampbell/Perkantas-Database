/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';
import {
  DefaultInputHeight,
  DefaultInputFontSize,
} from './BasicStyles';

const BackgroundColor = '#2A2C4E';
const ButtonColor = '#815BF0';

export const EntryDataAKKStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: BackgroundColor,
    flexDirection: 'column',
  },
  welcomingSectionStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    zIndex: 4,
    height: '12%',
  },
  instSectionStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BackgroundColor,
    zIndex: 2,
    paddingVertical: ProportionateScreenSizeValue(10),
  },
  instButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '32%',
  },
  buttonStyle: {
    height: ProportionateScreenSizeValue(30),
    width: ProportionateScreenSizeValue(85),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelectedStyle: {
    backgroundColor: '#03ad7d',
  },
  buttonUnselectedStyle: {
    borderWidth: ProportionateScreenSizeValue(1),
    borderColor: '#FAFAFA',
  },
  nameButtonTextStyle: {
    color: '#FAFAFA',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: ProportionateScreenSizeValue(10),
  },
  nameButtonUselectedTextStyle: {
    color: '#CCC',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(10),
  },
  formSectionStyle:{
    backgroundColor: '#FAFAFA',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: ProportionateScreenSizeValue(4),
    height: '88%',
  },
  formBodySectionStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: ProportionateScreenSizeValue(DefaultInputHeight),
    marginVertical: ProportionateScreenSizeValue(4),
  },
  formStyle: {
    color: '#000',
    backgroundColor: '#FAFAFA',
    width: '90%',
    fontSize: ProportionateScreenSizeValue(12),
    borderWidth: ProportionateScreenSizeValue(1.5),
    borderColor: '#D1D5E0',
    borderRadius: ProportionateScreenSizeValue(10),
  },
  dropdownInputContainerStyle: {
    width: '100%',
    height: ProportionateScreenSizeValue(DefaultInputHeight),
    fontSize: ProportionateScreenSizeValue(DefaultInputFontSize),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: ProportionateScreenSizeValue(1),
  },
  dropdownInputStyle: {
    width: '80%',
    height: '100%',
    paddingLeft: ProportionateScreenSizeValue(15),
    paddingRight: ProportionateScreenSizeValue(15),
    color: '#000',
    fontSize: ProportionateScreenSizeValue(DefaultInputFontSize),
  },
  dropdownResetButtonContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownResetButtonStyle: {
    marginLeft: ProportionateScreenSizeValue(130),
    zIndex: 2,
    width: ProportionateScreenSizeValue(16),
    height: ProportionateScreenSizeValue(16),
    borderRadius: ProportionateScreenSizeValue(8),
    borderWidth: ProportionateScreenSizeValue(1),
    borderColor: 'rgba(255, 0, 0, 1)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  dropdownResetButtonTextStyle: {
    fontSize: ProportionateScreenSizeValue(10),
    lineHeight: ProportionateScreenSizeValue(12),
    color: 'rgba(255, 0, 0, 1)',
    fontWeight: 'bold',
  },
  dropdownButtonContainerStyle: {
    width: '20%',
    height: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: ProportionateScreenSizeValue(1),
    borderLeftColor: '#CBCBCB',
  },
  dropdownButtonStyle: {
    fontSize: ProportionateScreenSizeValue(8),
  },
  dropdownListMainSectionStyle: {
    width: '90%',
    height: ProportionateScreenSizeValue(300),
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.5,
    shadowRadius: ProportionateScreenSizeValue(20),
    shadowColor: '#000',
    elevation: ProportionateScreenSizeValue(20),
  },
  dropdownListViewSectionStyle: {
    width: '100%',
  },
  dropdownListSearchSectionStyle: {
    width: '100%',
    height: ProportionateScreenSizeValue(DefaultInputHeight),
    marginTop: ProportionateScreenSizeValue(10),
    marginBottom: ProportionateScreenSizeValue(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownListSearchSectionContainerStyle: {
    width: '90%',
    height: '100%',
    borderWidth: ProportionateScreenSizeValue(1),
    borderColor: '#D1D5E0',
    borderRadius: ProportionateScreenSizeValue(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownListSearchInputStyle: {
    width: '80%',
    fontSize: ProportionateScreenSizeValue(12),
    paddingHorizontal: ProportionateScreenSizeValue(10),
  },
  dropdownListSearchButtonStyle: {
    borderLeftWidth: ProportionateScreenSizeValue(1),
    borderColor: '#D1D5E0',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
    width: '20%',
  },
  dropdownListViewItemSectionStyle: {
    width: '100%',
    height: ProportionateScreenSizeValue(45),
    padding: ProportionateScreenSizeValue(5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownListViewItemTextSectionStyle: {
    width: '80%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dropdownListViewItemTextStyle: {
    fontSize: ProportionateScreenSizeValue(12),
  },
  dropdownListButtonSectionStyle: {
    width: '100%',
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownListButtonStyle: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: ProportionateScreenSizeValue(1),
    borderTopColor: '#CECECE',
  },
  dropdownListButtonContentStyle: {
    width: '80%',
    height: '60%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownListButtonSelectStyle: {
    backgroundColor: ButtonColor,
  },
  dropdownListButtonCancelStyle: {
    backgroundColor: '#FAFAFA',
    borderWidth: ProportionateScreenSizeValue(1),
    borderColor: ButtonColor,
  },
  dropdownListButtonTextStyle: {
    fontSize: ProportionateScreenSizeValue(12),
  },
  dropdownListButtonSelectTextStyle: {
    color: '#FAFAFA',
  },
  dropdownListButtonCancelTextStyle: {
    fontSize: ProportionateScreenSizeValue(12),
    color: ButtonColor,
  },
  datePickerMainSectionStyle: {
    width: '90%',
    height: ProportionateScreenSizeValue(120),
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
  submitButtonTextStyle: {
    color: '#FAFAFA',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(16),
    lineHeight: ProportionateScreenSizeValue(16),
    fontWeight: 'bold',
  },
});
