/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

const DiscipleShort = (props) => {
  const [checked, setChecked] = useState(props.checked);

  const onCheck = (id, currChecked) => {
    setChecked(currChecked);

    if (props.onCheck)
      props.onCheck(id, currChecked);
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        width: '90%',
        height: ProportionateScreenSizeValue(40),
        marginVertical: ProportionateScreenSizeValue(5),
        paddingHorizontal: ProportionateScreenSizeValue(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: ProportionateScreenSizeValue(20),
        borderBottomRightRadius: ProportionateScreenSizeValue(20),
        shadowOffset: {
          width: 0,
          height: ProportionateScreenSizeValue(5),
        },
        shadowOpacity: 0.2,
        shadowRadius: ProportionateScreenSizeValue(5),
        shadowColor: '#000',
        elevation: ProportionateScreenSizeValue(5),
        backgroundColor: checked ? '#FAFAFA' : '#FAFAFA',
      }}
      onPress={() => onCheck(props.member ? props.member.id : 0, !checked)}
    >
      <View
        style={{
          height: '100%',
          width: '88%',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: ProportionateScreenSizeValue(12),
            fontWeight: 'bold',
            color: checked ? '#000' : '#CCC',
          }}
          numberOfLines={1}
        >
          {props.member ? props.member.name : ''}
        </Text>
        </View>
      <View
        style={{
          height: ProportionateScreenSizeValue(30),
          width: ProportionateScreenSizeValue(30),
          borderRadius: ProportionateScreenSizeValue(15),
          backgroundColor: checked ? '#08d49a' : '#DCDCDC',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {
          (checked) ?
          <Text
            style={{
              fontSize: ProportionateScreenSizeValue(12),
              fontWeight: 'bold',
              color: '#FAFAFA',
            }}
            numberOfLines={1}
          >
            ✔
          </Text>
          :
          null
        }
      </View>
    </TouchableOpacity>
  );
};

export default DiscipleShort;
