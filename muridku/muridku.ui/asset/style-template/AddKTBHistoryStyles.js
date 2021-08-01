/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';
import {
  DefaultInputHeight,
} from './BasicStyles';

const ButtonColor = '#815BF0';

export const AddKTBHistoryStyles = StyleSheet.create({
  bodyContainerStyle: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonSectionStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  menuButtonEnableSectionStyle: {
    height: ProportionateScreenSizeValue(45),
    marginBottom: 0,
    backgroundColor: '#366BC6',
  },
  menuButtonDisableSectionStyle: {
    height: ProportionateScreenSizeValue(35),
    marginBottom: ProportionateScreenSizeValue(2),
    backgroundColor: 'rgba(54, 107, 198, 0.6)',
  },
  menuButtonTitleSectionStyle: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: ProportionateScreenSizeValue(10),
  },
  menuButtonTitleEnableSectionStyle: {
    alignItems: 'center',
  },
  menuButtonTitleDisableSectionStyle: {
    alignItems: 'flex-start',
  },
  menuButtonTitleDateSectionStyle: {
    width: '60%',
  },
  menuButtonTitleAKKSectionStyle: {
    width: '20%',
  },
  menuButtonTitleMaterialSectionStyle: {
    width: '40%',
  },
  menuButtonTitleViewHistorySectionStyle: {
    width: '100%',
  },
  menuButtonDataSectionStyle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: ProportionateScreenSizeValue(10),
  },
  menuButtonDataDateSectionStyle: {
    width: '40%',
  },
  menuButtonDataAKKSectionStyle: {
    width: '80%',
  },
  menuButtonDataMaterialSectionStyle: {
    width: '60%',
  },
  menuButtonTextStyle: {
    fontStyle: 'italic',
    color: '#FAFAFA',
  },
  menuButtonTitleEnableTextStyle: {
    fontSize: ProportionateScreenSizeValue(16),
  },
  menuButtonTitleDisableTextStyle: {
    fontSize: ProportionateScreenSizeValue(12),
  },
  menuButtonDataTextStyle: {
    fontSize: ProportionateScreenSizeValue(10),
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
  footerSectionStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonSaveStyle: {
    width: ProportionateScreenSizeValue(250),
    height: ProportionateScreenSizeValue(42),
    backgroundColor: '#F59873',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonSaveTextStyle: {
    color: '#FAFAFA',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(16),
    lineHeight: ProportionateScreenSizeValue(16),
    fontWeight: 'bold',
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
