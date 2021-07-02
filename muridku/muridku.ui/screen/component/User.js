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

const User = (props) => {
  const [approveChecked, setApproveChecked] = useState(props.status === 1);
  const [rejectChecked, setRejectChecked] = useState(props.status === 3);

  const onApproveCheck = (id, currChecked) => {
    if (currChecked && rejectChecked) {
      setRejectChecked(false);

      if (props.onRejectCheck)
        props.onRejectCheck(id, false);
    }

    setApproveChecked(currChecked);

    if (props.onApproveCheck)
      props.onApproveCheck(id, currChecked);
  };

  const onRejectCheck = (id, currChecked) => {
    if (currChecked && approveChecked) {
      setApproveChecked(false);

      if (props.onApproveCheck)
        props.onApproveCheck(id, false);
    }

    setRejectChecked(currChecked);

    if (props.onRejectCheck)
      props.onRejectCheck(id, currChecked);
  };

  return (
    <View style={{
      width: '100%',
      height: ProportionateScreenSizeValue(60),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <View style={{
        width: '70%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
        <View style={{
          width: '100%',
          height: '60%',
          paddingHorizontal: ProportionateScreenSizeValue(10),
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
        }}>
          <Text style={{
            fontSize: ProportionateScreenSizeValue(16),
            fontWeight: 'bold',
          }}>{props.user.name}</Text>
        </View>
        <View style={{
          width: '100%',
          height: '40%',
          paddingHorizontal: ProportionateScreenSizeValue(10),
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          borderBottomColor: '#CDCDCD',
          borderBottomWidth: ProportionateScreenSizeValue(1),
        }}>
        <Text style={{
          fontSize: ProportionateScreenSizeValue(10),
        }}>{`${props.user.email} - ${props.user.is_active === 0 ? 'registrasi' : (props.user.is_active === 2 ? 'member' : 'reject')}`}</Text>
        </View>
      </View>
      <View style={{
        width: '30%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          width: '50%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingHorizontal: ProportionateScreenSizeValue(2),
        }}>
          <TouchableOpacity
            style={{
              width: ProportionateScreenSizeValue(30),
              height: ProportionateScreenSizeValue(30),
              borderRadius: ProportionateScreenSizeValue(15),
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: approveChecked ? '#08D49A' : '#CDCDCD',
            }}
            onPress={() => onApproveCheck(props.user.id, !approveChecked)}
            activeOpacity={0.5}
          >
            <Text style={{
              color: '#FFF',
              fontSize: ProportionateScreenSizeValue(12),
              lineHeight: ProportionateScreenSizeValue(14),
            }}>✔</Text>
          </TouchableOpacity>
        </View>
        <View style={{
          width: '50%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingHorizontal: ProportionateScreenSizeValue(2),
        }}>
          <TouchableOpacity
            style={{
              width: ProportionateScreenSizeValue(30),
              height: ProportionateScreenSizeValue(30),
              borderRadius: ProportionateScreenSizeValue(15),
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: rejectChecked ? 'red' : '#CDCDCD',
            }}
            onPress={() => onRejectCheck(props.user.id, !rejectChecked)}
            activeOpacity={0.5}
          >
            <Text style={{
              color: '#FFF',
              fontSize: ProportionateScreenSizeValue(12),
              lineHeight: ProportionateScreenSizeValue(14),
            }}>✖</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default User;
