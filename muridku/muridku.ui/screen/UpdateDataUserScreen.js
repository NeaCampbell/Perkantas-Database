/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import { connect } from 'react-redux';
import { BasicStyles, BasicColor } from '../asset/style-template/BasicStyles';
import { BackgroundColor } from '../asset/style-template/MenuBasicStyles';
import { UpdateDataUserStyles } from '../asset/style-template/UpdateDataUserStyles';
import Error from './component/Error';
import {
  ProportionateScreenSizeValue,
} from '../helper/CommonHelper';
import { SET_SELECTED_MEMBER, SET_CURRENT_PAGE } from '../reducer/action/ActionConst';

const getmemberbyidapi = require('../api/out/getmemberbyid');

const UpdateDataUserScreen = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const errorHandler = (error) => {
    setLoading(false);
    setErrorText(error.message);
  };

  const callbackGetMember = (result) => {
    setLoading(false);

    if (!result.succeed) {
      setErrorText(result.errorMessage);
      return;
    }

    props.dispatch({ type: SET_SELECTED_MEMBER, member: result.result });
    props.dispatch({ type: SET_CURRENT_PAGE, page: 'EntryDataUserScreen' });
    navigation.replace('EntryDataUserScreen');
  };

  const onChangePersonalDataClick = () => {
    setLoading(true);
    getmemberbyidapi.getmemberbyid(props.User.member_id, props.User.email, callbackGetMember, errorHandler);
  };

  const onUpdatePasswordClick = () => {
    props.dispatch({ type: SET_CURRENT_PAGE, page: 'UpdatePasswordScreen' });
    navigation.replace('UpdatePasswordScreen');
  };

  const {
    globalFontStyle,
  } = BasicStyles;

  const {
    bodyContainerStyle,
    mainButtonSectionStyle,
    mainButtonStyle,
    mainButtonTextStyle,
    mainButtonSeparatorStyle,
    customActivityIndicatorStyle,
  } = UpdateDataUserStyles;

  const child = (
    <View style={bodyContainerStyle}>
      <View style={mainButtonSectionStyle}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={mainButtonStyle}
          onPress={() => onChangePersonalDataClick()}
        >
          <Text style={[globalFontStyle, mainButtonTextStyle]}>UBAH DATA PRIBADI</Text>
        </TouchableOpacity>
        <View style={mainButtonSeparatorStyle}/>
        <TouchableOpacity
          activeOpacity={0.5}
          style={mainButtonStyle}
          onPress={() => onUpdatePasswordClick()}
        >
          <Text style={[globalFontStyle, mainButtonTextStyle]}>UBAH PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const loadingScreen = (
    <View style={customActivityIndicatorStyle}>
      <ActivityIndicator
        animating={loading}
        color={BasicColor}
        size={ProportionateScreenSizeValue(30)}
      />
    </View>
  );

  const errorScreen = (
    <Error
      buttonClick={() => setErrorText('')}
      message={errorText}
    />
  );

  return (
    <BodyMenuBaseScreen
      loadingScreen={loading ? loadingScreen : null}
      errorScreen={errorText !== '' ? errorScreen : null}
      title="User"
      child={child}
      childName="UpdateDataUserScreen"
      navigation={navigation}
      statusBarColor={BackgroundColor}
    />
  );
};

const mapStateToProps = state => {
  const { Page, User } = state;
  return { Page, User };
};

export default connect(mapStateToProps)(UpdateDataUserScreen);
