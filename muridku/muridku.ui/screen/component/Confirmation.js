/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  ConfirmationStyles,
} from '../../asset/style-template/ConfirmationStyles';

const Confirmation = (props) => {
  const onFirstButtonClick = () => {
    if (props.onFirstButtonClick)
      props.onFirstButtonClick();
  };

  const onSecondButtonClick = () => {
    if (props.onSecondButtonClick)
      props.onSecondButtonClick();
  };

  const {
    bodyContainerStyle,
    messageBoxSectionStyle,
    messageBoxTextSectionStyle,
    messageBoxTextStyle,
    messageBoxButtonSectionStyle,
    messageBoxButtonInnerSectionStyle,
    messageBoxButtonStyle,
    messageBoxButtonConfirmStyle,
    messageBoxButtonAlertStyle,
    messageBoxButtonTextStyle,
    messageBoxButtonConfirmInverseStyle,
    messageBoxButtonAlertInverseStyle,
    messageBoxButtonTextConfirmInverseStyle,
    messageBoxButtonTextAlertInverseStyle,
  } = ConfirmationStyles;

  return (
    <View style={bodyContainerStyle}>
      <View style={messageBoxSectionStyle}>
        <View style={messageBoxTextSectionStyle}>
          <Text style={messageBoxTextStyle}>
            {props.confirmText}
          </Text>
        </View>
        <View style={messageBoxButtonSectionStyle}>
          <View style={messageBoxButtonInnerSectionStyle}>
            <TouchableOpacity
              style={[messageBoxButtonStyle, (props.mode === AlertMode ? messageBoxButtonAlertStyle : messageBoxButtonConfirmStyle)]}
              onPress={() => onFirstButtonClick()}
            >
              <Text style={messageBoxButtonTextStyle}>
                {props.firstButtonText}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={messageBoxButtonInnerSectionStyle}>
            <TouchableOpacity
              style={[messageBoxButtonStyle, (props.mode === AlertMode ? messageBoxButtonAlertInverseStyle : messageBoxButtonConfirmInverseStyle)]}
              onPress={() => onSecondButtonClick()}
            >
              <Text style={props.mode === AlertMode ? messageBoxButtonTextAlertInverseStyle : messageBoxButtonTextConfirmInverseStyle}>
                {props.secondButtonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Confirmation;
export const ConfirmMode = 'CONFIRM';
export const AlertMode = 'ALERT';
