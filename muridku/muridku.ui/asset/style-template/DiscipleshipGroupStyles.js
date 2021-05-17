import {
  StyleSheet,
} from 'react-native';
import {
  ProportionateScreenSizeValue
} from '../../helper/CommonHelper';

export const DiscipleshipGroupStyles = StyleSheet.create({
  ktbBoxSectionStyle: {
    flexDirection: 'column',
    width: '90%',
    flex: 1,
    marginLeft: ProportionateScreenSizeValue(15),
    marginRight: ProportionateScreenSizeValue(15),
    marginBottom: ProportionateScreenSizeValue(10),
    padding: ProportionateScreenSizeValue(10),
    justifyContent: 'center',
    alignItems: 'center',
    color: '#000000',
    backgroundColor: '#FFF9F9',
    borderRadius: ProportionateScreenSizeValue(10),
  },
  checkBoxSectionStyle: {
    marginRight: ProportionateScreenSizeValue(15)
  },
  descSectionStyle: {
    width: '100%',
    flexDirection: 'row',
  },
  groupSectionStyle: {
    width: '50%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  groupNameStyle: {
    color:'#000000',
    fontSize: ProportionateScreenSizeValue(20),
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
    width: ProportionateScreenSizeValue(40),
    height: ProportionateScreenSizeValue(40),
    marginLeft: ProportionateScreenSizeValue(-7),
    borderRadius: ProportionateScreenSizeValue(20),
    backgroundColor:'#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: -2,
      height: 1,
    },
    shadowColor: '#555',
    shadowOpacity: 0.2,
    borderWidth: 1,
    borderColor: '#AAA',
  },
  iconUserTextStyle: {
    color: '#000000',
    fontSize: ProportionateScreenSizeValue(15),
    fontWeight: 'bold',
  },
  otherDescSectionStyle: {
    height: ProportionateScreenSizeValue(20)
  },
  otherDescTitleStyle: {
    width: '60%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  otherDescValueStyle: {
    width: '40%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  otherDescTextStyle: {
    color: '#666',
    fontSize: ProportionateScreenSizeValue(12),
  },
});