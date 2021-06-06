/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, createRef} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Checkbox from './component/Checkbox';
import { connect } from 'react-redux';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import { BasicStyles, BasicColor, LoadingViewSize } from '../asset/style-template/BasicStyles';
import { RegisterStyles, BackgroundColor } from '../asset/style-template/RegisterStyles';
import { ProportionateScreenSizeValue } from '../helper/CommonHelper';

const ActivationScreen = (props) => {
  const { navigation } = props;
  const [userFullname, setUserFullname] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const fullnameInputRef = createRef();
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordConfirmInputRef = createRef();
  const [checked, setChecked] = React.useState(false);


  const {
    globalFontStyle,
    errorSectionStyle,
    errorMessageContainerStyle,
    errorMessageTextStyle,
    errorMessageButtonStyle,
    errorMessageButtonTextStyle,
  } = BasicStyles;

  const {
    bodyContainerStyle,
    logoContainerStyle,
    logoStyle,
    titleContainerStyle,
    titleStyle,
    bodySectionStyle,
    buttonStyle,
    buttonTextStyle,
    techProblemDescStyle,
    techProblemStyle,
    customActivityIndicatorStyle,
  } = RegisterStyles;

  // const showScrollBar = Platform.OS === 'web';

  const baseScreenItems = (
    <View style={bodyContainerStyle}>
      {
        (errorText !== '') ? (
          <View style={errorSectionStyle}>
            <View style={errorMessageContainerStyle}>
              <Text style={errorMessageTextStyle} numberOfLines={1}>
                {`Error! ${errorText}`}
              </Text>
              <TouchableOpacity
                style={errorMessageButtonStyle}
                onPress={() => setErrorText('')}
              >
              <Text style={errorMessageButtonTextStyle} numberOfLines={1}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null
      }
      <View style={[bodySectionStyle, titleContainerStyle]}>
        <Text style={[titleStyle, {paddingTop: ProportionateScreenSizeValue(15)}]} numberOfLines={1}>
          User Activation List
        </Text>
      </View>
      <ScrollView>
        <View style={{backgroundColor: '#FFFFFF'}}>
          <View style={styles.UserScreen}>
            <Image
              source={require('../asset/img/account.png')}
              style={styles.IconProfile}
            />
            <View style={{marginLeft: ProportionateScreenSizeValue(14),marginRight: ProportionateScreenSizeValue(14),marginTop:  ProportionateScreenSizeValue(5)}}>
              <Text style={styles.nameStyle} numberOfLines={1}>Sany Miul</Text>
              <Text style={styles.emailStyle} numberOfLines={1}>sannymiul@gmail.com</Text>
            </View>
            <View style={{left:25,margin:'auto'}}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                setChecked(!checked);
              }}/>
            </View>
          </View>
          <Image
            source={require('../asset/img/Line2.png')}
            style={styles.BurgerLine}
          />
          <View style={bodySectionStyle}>
            <TouchableOpacity
              style={buttonStyle}
              activeOpacity={0.5}
            >
              <Text style={[globalFontStyle, buttonTextStyle]} numberOfLines={1}>
                Confirm
              </Text>
          </TouchableOpacity>
        </View>

        <View style={[bodySectionStyle, {alignItems: 'flex-end'}]}>
          <Text style={[globalFontStyle, techProblemDescStyle]} numberOfLines={1}>Kesulitan mengakses akun MURIDKU?</Text>
        </View>
          <View style={[bodySectionStyle, {alignItems: 'flex-start'}]}>
            <TouchableOpacity activeOpacity={0.5}>
              <Text
                style={[globalFontStyle, techProblemStyle]}>
                Laporkan masalah teknis
              </Text>
            </TouchableOpacity>
          </View>
          {(loading) ?
            (<View style={customActivityIndicatorStyle}>
              <ActivityIndicator
                animating={loading}
                color={BasicColor}
                size={LoadingViewSize}
              />
            </View>) : null
          }
        </View>
      </ScrollView>
    </View>
  );

  return (
    <BodyMenuBaseScreen
      title="Aktivasi User"
      child={baseScreenItems}
      statusBarColor={BackgroundColor}
      childName="ActivationScreen"
      navigation={navigation}
    />
  );
};

const mapStateToProps = state => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps)(ActivationScreen);

const styles = StyleSheet.create({
  UserScreen: {
    display:'flex',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingTop: ProportionateScreenSizeValue(15),
  },
  IconProfile: {
    display:'flex',
    width: ProportionateScreenSizeValue(60),
    height: ProportionateScreenSizeValue(60),
    marginLeft: ProportionateScreenSizeValue(20),
  },
  nameStyle:{
    fontFamily: 'Monsterrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: ProportionateScreenSizeValue(16),
    lineHeight: ProportionateScreenSizeValue(19),
    color: '#3A2A6E',
  },
  emailStyle:{
    fontFamily: 'Monsterrat',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: ProportionateScreenSizeValue(12),
    lineHeight: ProportionateScreenSizeValue(19),
    color: '#3A2A6E',
  },
  BurgerLine: {
    width: ProportionateScreenSizeValue(361),
    height: ProportionateScreenSizeValue(3),
    marginTop: ProportionateScreenSizeValue(20),
    marginBottom: ProportionateScreenSizeValue(20),
    marginHorizontal:'auto',
    },
});
