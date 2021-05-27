/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  WindowSize,
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

const BackgroundColor = '#2A2C4E';

export const ViewDataKTBStyles = StyleSheet.create({
  bodyContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: BackgroundColor,
  },
  historySectionStyle: {
    height: WindowSize.height * 10 / 100,
    backgroundColor: '#1D1E36',
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
    color: '#FFF',
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
  discipleSectionStyle: {
    height: ProportionateScreenSizeValue(110),
    width: '90%',
    marginTop: ProportionateScreenSizeValue(10),
    justifyContent: 'center',
  },
  buttonDiscipleStyle: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: ProportionateScreenSizeValue(110),
    width: '100%',
    alignItems: 'flex-start',
    borderTopLeftRadius: ProportionateScreenSizeValue(10),
    borderTopRightRadius: ProportionateScreenSizeValue(10),
    borderBottomLeftRadius: ProportionateScreenSizeValue(10),
    borderBottomRightRadius: ProportionateScreenSizeValue(10),
  },
  textButtonSectionStyle: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  nameButtonSectionStyle: {
    paddingLeft: ProportionateScreenSizeValue(15),
    paddingRight: ProportionateScreenSizeValue(15),
    paddingTop: ProportionateScreenSizeValue(7),
    paddingBottom: ProportionateScreenSizeValue(7),
    borderTopLeftRadius: ProportionateScreenSizeValue(10),
    borderTopRightRadius: ProportionateScreenSizeValue(10),
    backgroundColor: 'rgba(255,255,255,1)',
    width: '100%',
  },
  nameButtonTextStyle: {
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(14),
    lineHeight: ProportionateScreenSizeValue(14),
    fontWeight: 'bold',
    color: '#000',
  },
  cityButtonTopTextStyle: {
    paddingTop: ProportionateScreenSizeValue(5),
    paddingLeft: ProportionateScreenSizeValue(15),
    paddingRight: ProportionateScreenSizeValue(15),
    color: '#3A2A6E',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(10),
    lineHeight: ProportionateScreenSizeValue(10),
  },
  cityButtonTextStyle: {
    paddingLeft: ProportionateScreenSizeValue(15),
    paddingRight: ProportionateScreenSizeValue(15),
    color: '#3A2A6E',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(10),
    lineHeight: ProportionateScreenSizeValue(10),
  },
  footerSectionStyle: {
    flexDirection: 'row',
    height: ProportionateScreenSizeValue(42),
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    marginBottom: ProportionateScreenSizeValue(15),
    justifyContent: 'center',
  },
  footerViewStyle: {
    width: '50%',
    alignItems: 'center',
    justifyContent:'flex-start',
  },
  buttonFooterStyle: {
    backgroundColor: '#815BF0',
    color: '#FFFFFF',
    height: ProportionateScreenSizeValue(35),
    width: ProportionateScreenSizeValue(35),
    alignItems: 'center',
    marginTop: ProportionateScreenSizeValue(10),
    borderTopLeftRadius: ProportionateScreenSizeValue(5),
    borderTopRightRadius: ProportionateScreenSizeValue(5),
    borderBottomLeftRadius: ProportionateScreenSizeValue(5),
    borderBottomRightRadius: ProportionateScreenSizeValue(5),
    justifyContent: 'center',
  },
  customActivityIndicatorStyle: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    opacity: 0.3,
  },
});
