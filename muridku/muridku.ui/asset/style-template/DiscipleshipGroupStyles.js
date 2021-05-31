/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

const IdColor = '#08D49A';

export const DiscipleshipGroupStyles = StyleSheet.create({
  bodyContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: ProportionateScreenSizeValue(110),
  },
  ktbBoxSectionStyle: {
    flexDirection: 'column',
    width: '90%',
    flex: 1,
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    marginBottom: ProportionateScreenSizeValue(10),
    padding: ProportionateScreenSizeValue(10),
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
  ktbBoxSectionUncheckStyle: {
    marginRight: ProportionateScreenSizeValue(15),
  },
  ktbBoxSectionCheckStyle: {
    marginRight: 0,
  },
  checkBoxSectionStyle: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewSectionStyle: {
    width: '100%',
  },
  descSectionStyle: {
    width: '100%',
    flexDirection: 'row',
  },
  groupSectionStyle: {
    width: '50%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: ProportionateScreenSizeValue(2),
    borderBottomColor: '#E7E7E7',
  },
  groupNameStyle: {
    color:'#000000',
    fontSize: ProportionateScreenSizeValue(15),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  memberSectionStyle: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  iconUserStyle: {
    width: ProportionateScreenSizeValue(30),
    height: ProportionateScreenSizeValue(30),
    marginLeft: ProportionateScreenSizeValue(-4),
    borderRadius: ProportionateScreenSizeValue(15),
    borderColor: '#AAA',
    borderWidth: ProportionateScreenSizeValue(1),
    backgroundColor:'#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconUserTextStyle: {
    color: '#000000',
    fontSize: ProportionateScreenSizeValue(12),
    fontWeight: 'bold',
  },
  otherDescSectionStyle: {
    height: ProportionateScreenSizeValue(15),
  },
  otherDescTitleStyle: {
    width: '35%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  otherDescValueStyle: {
    width: '65%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  otherDescTextStyle: {
    color: '#666',
    fontSize: ProportionateScreenSizeValue(10),
  },
});
