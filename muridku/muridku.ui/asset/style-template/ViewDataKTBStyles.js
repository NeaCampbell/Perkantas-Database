/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

const ButtonColor = '#815BF0';
const DetailTextColor = 'black';

export const ViewDataKTBStyles = StyleSheet.create({
  headerStyle: {
    height: '100%',
    width: '100%',
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
    color: 'rgba(255, 255, 255, 1)',
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
    color: 'rgba(255, 255, 255, 1)',
  },
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  dataSectionStyle: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    flex: 1,
  },
  headerRightButtonSectionStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%',
  },
  headerRightButtonTextStyle: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  historySectionStyle: {
    height: '13%',
    backgroundColor: '#EFEFEF',
    flexDirection: 'column',
    paddingTop: ProportionateScreenSizeValue(10),
    paddingLeft: ProportionateScreenSizeValue(10),
    paddingRight: ProportionateScreenSizeValue(10),
    paddingBottom: ProportionateScreenSizeValue(10),
  },
  historyInnerSectionStyle: {
    width: '100%',
    flexDirection: 'row',
  },
  historyInnerTitleSectionStyle: {
    width: '40%',
  },
  historyInnerValueSectionStyle: {
    width: '60%',
  },
  historyTextStyle: {
    color: DetailTextColor,
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(10),
    lineHeight: ProportionateScreenSizeValue(12),
  },
  contentSectionStyle: {
    flexDirection: 'column',
    height: '83%',
    width: '100%',
  },
  contentSectionInnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerSectionStyle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerViewStyle: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonFooterStyle: {
    height: ProportionateScreenSizeValue(36),
    width: ProportionateScreenSizeValue(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ProportionateScreenSizeValue(18),
    borderWidth: ProportionateScreenSizeValue(1),
  },
  buttonFooterEnableStyle: {
    borderColor: ButtonColor,
    backgroundColor: '#FFF',
  },
  buttonFooterDisableStyle: {
    borderColor: 'rgba(129, 91, 240, 0.5)',
    backgroundColor: '#FFF',
  },
  buttonFooterTextStyle: {
    fontSize: ProportionateScreenSizeValue(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFooterTextEnableStyle: {
    color: ButtonColor,
    fontWeight: 'bold',
  },
  buttonFooterTextDisableStyle: {
    color: 'rgba(129, 91, 240, 0.5)',
  },
  customActivityIndicatorStyle: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});
