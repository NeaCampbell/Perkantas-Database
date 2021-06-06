/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable curly */
import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  ProportionateScreenSizeValue,
} from '../../helper/CommonHelper';

const Checkbox = (props) => {
  const onCheck = (check) => {
    if (props.onCheck)
      props.onCheck(check);
  };

  return (
    <TouchableOpacity
      style={{
        height: ProportionateScreenSizeValue(30),
        width: ProportionateScreenSizeValue(30),
        borderRadius: ProportionateScreenSizeValue(15),
        backgroundColor: props.checked ? (props.activeColor ?? '#08D49A') : '#DCDCDC',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => onCheck(props.checked)}
      disabled={props.disabled}
    >
      {
        (props.checked) ?
        <Text
          style={{
            fontSize: ProportionateScreenSizeValue(12),
            fontWeight: 'bold',
            color: '#FFF',
          }}
        >
          ✔
        </Text>
        :
        null
      }
    </TouchableOpacity>
  );
};

export default Checkbox;
