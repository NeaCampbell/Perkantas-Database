/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

const DetailTextColor = '#000';
export const IdColor = '#77C0ED';

export const DiscipleStyles = StyleSheet.create({
  bodyContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: ProportionateScreenSizeValue(175),
  },
  discipleBoxSectionStyle: {
    flexDirection: 'column',
    width: '90%',
    flex: 1,
    padding: ProportionateScreenSizeValue(10),
    marginTop: ProportionateScreenSizeValue(10),
    marginLeft: ProportionateScreenSizeValue(15),
    borderLeftWidth: ProportionateScreenSizeValue(10),
    borderLeftColor: IdColor,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    backgroundColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: ProportionateScreenSizeValue(5),
    },
    shadowOpacity: 0.2,
    shadowRadius: ProportionateScreenSizeValue(5),
    shadowColor: '#000',
    elevation: ProportionateScreenSizeValue(5),
  },
  discipleBoxSectionCheckStyle: {
    marginRight: 0,
  },
  discipleBoxSectionUncheckStyle: {
    marginRight: ProportionateScreenSizeValue(15),
  },
  checkBoxSectionStyle: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSectionStyle: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  nameSectionStyle: {
    paddingLeft: ProportionateScreenSizeValue(5),
    paddingRight: ProportionateScreenSizeValue(5),
    paddingTop: ProportionateScreenSizeValue(5),
    paddingBottom: ProportionateScreenSizeValue(5),
    backgroundColor: 'rgba(255,255,255,1)',
    borderBottomWidth: ProportionateScreenSizeValue(2),
    borderBottomColor: '#E7E7E7',
    width: '100%',
  },
  nameTextStyle: {
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(14),
    fontWeight: 'bold',
    color: '#000',
  },
  descTextStyle: {
    paddingLeft: ProportionateScreenSizeValue(5),
    paddingRight: ProportionateScreenSizeValue(5),
    color: DetailTextColor,
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(10),
    height: ProportionateScreenSizeValue(15),
  },
  descTopTextStyle: {
    paddingTop: ProportionateScreenSizeValue(5),
    height: ProportionateScreenSizeValue(20),
  },
});
