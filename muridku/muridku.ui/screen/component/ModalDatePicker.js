/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const opacity = 0.5;

const ModalList = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.selectedDate);

  const onSelectClick = (date) => {
    if (!date)
      return;

    if (props.onSelectClick)
      props.onSelectClick(date);
  };

  const onCancelClick = () => {
    if (props.onCancelClick)
      props.onCancelClick();
  };

  return (
    <View style={styles.bodyContainerStyle}>
      <View style={props.mainSectionStyle}>
        <View style={props.dateSectionStyle}>
          <DatePicker
            date={selectedDate ?? new Date()}
            onDateChange={setSelectedDate}
            minimumDate={props.minDt}
            maximumDate={props.maxDt}
            mode={props.mode}
          />
        </View>
        <View style={props.buttonSectionStyle}>
          <TouchableOpacity
            style={[props.buttonStyle, !selectedDate || selectedDate === 0 ? styles.buttonDisableStyle : null]}
            onPress={() => onSelectClick(selectedDate)}
            disabled={!selectedDate || selectedDate === 0}
            activeOpacity={opacity}
          >
            <View style={props.selectButtonStyle}>
              <Text style={props.selectTextStyle} numberOfLines={1}>SELECT</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={props.buttonStyle}
            onPress={() => onCancelClick()}
            activeOpacity={opacity}
          >
            <View style={props.cancelButtonStyle}>
              <Text style={props.cancelTextStyle} numberOfLines={1}>CANCEL</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainerStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  listSectionContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisableStyle: {
    opacity: opacity,
  },
});

export default ModalList;
