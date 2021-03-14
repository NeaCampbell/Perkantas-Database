// Import React and Component
import React, {useState, createRef} from 'react';
import {
  ActivityIndicator,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

// Import linear gradient component
import { LinearGradient } from 'expo-linear-gradient';

// Import reducer dependencies
import { connect } from 'react-redux';

// Import async storage for credential storage
import AsyncStorage from '@react-native-community/async-storage';

// Import needed views
import BodyBaseScreen from './BodyBaseScreen';
import PasswordToggle from './component/PasswordToggle';

const UserScreen = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirm, setUserPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const passwordConfirmInputRef = createRef();
  const { navigation } = props;

  const handleCancelPress = () => {
    navigation.replace('LoginScreen');
  }

  const handleSubmitPress = () => {
    setErrortext('');
    
    if (!userEmail) {
      alert('Email belum diisi.');
      emailInputRef.current.focus();
      return;
    }

    if (!userPassword) {
      alert('Password belum diisi.');
      passwordInputRef.current.focus();
      return;
    }

    if (!userPasswordConfirm) {
      alert('Konfirmasi Password belum diisi.');
      passwordConfirmInputRef.current.focus();
      return;
    }

    if (userPassword !== userPasswordConfirm) {
      alert('Password harus sama dengan Konfirmasi Password.');
      passwordConfirmInputRef.current.focus();
      return;
    }

    setLoading(true);
    let dataToSend = {
          user_email: userEmail,
          user_password: userPassword
        };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('https://aboutreact.herokuapp.com/login.php', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      //Hide Loader
      setLoading(false);
      console.log(responseJson);
      // If server response message same as Data Matched
      if (responseJson.status == 1) {
        AsyncStorage.setItem(
          'user_id',
            responseJson.data[0].user_id
        );
        console.log(responseJson.data[0].user_id);
        navigation.replace('DrawerNavigationRoutes');
      } else {
        setErrortext('Email atau password tidak sesuai. Mohon periksa kembali.');
        console.log('Email atau password tidak sesuai. Mohon periksa kembali.');
        emailInputRef.current.focus();
      }
    })
    .catch((error) => {
      //Hide Loader
      // setLoading(false);
      // setErrortext('Internal server error.\n Mohon kontak tim support.');
      // console.error(error);
      navigation.replace('LoginScreen');
    });
  };

  const { titleInputStyle, basicInputStyle, inputStyle, passwordInputStyle } = props.PageStyles.BasicStyles;
  
  const {
    bodyContainerStyle,
    bodyImageStyle,
    imageLogoStyle,
    bodySectionStyle,
    bodyWrapperStyle,
    bodySectionTitleStyle,
    errorTextStyle,
    buttonStyle,
    buttonTextStyle,
    buttonInvertStyle,
    buttonInvertTextStyle,
    saveOptionBodySectionStyle,
    saveOptionTitleStyle,
    customActivityIndicatorStyle
  } = props.PageStyles.UserStyles;

  const { BasicColor, InputWrapperColor, LoadingViewSize, PlaceholderTextColor } = props.PageStyles;

  const baseScreenItems = (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={bodyContainerStyle}>
      <View>
        <KeyboardAvoidingView enabled>
          <View style={bodyImageStyle}>
            <Image
              source={require('../asset/img/Logo.png')}
              style={imageLogoStyle}
            />
          </View>
          <LinearGradient colors={InputWrapperColor} style={bodyWrapperStyle}>
            <View style={bodySectionTitleStyle}>
              <Text style={titleInputStyle}>Email</Text>
            </View>
            <View style={bodySectionStyle}>
              <TextInput
                style={[basicInputStyle, inputStyle]}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder="Masukkan email anda"
                placeholderTextColor={PlaceholderTextColor}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                ref={emailInputRef}
              />
            </View>
            <View style={bodySectionTitleStyle}>
              <Text style={titleInputStyle}>Password</Text>
            </View>
            <View style={bodySectionStyle}>
              <PasswordToggle
                containerStyle={[basicInputStyle, inputStyle]}
                inputStyle={[basicInputStyle, passwordInputStyle]}
                onChangeText={
                  (UserPassword) => setUserPassword(UserPassword)
                }
                placeholder="Masukkan password anda"
                placeholderTextColor={PlaceholderTextColor}
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                refChild={passwordInputRef}
              />
            </View>
            <View style={bodySectionTitleStyle}>
              <Text style={titleInputStyle}>Konfirmasi Password</Text>
            </View>
            <View style={bodySectionStyle}>
              <PasswordToggle
                containerStyle={[basicInputStyle, inputStyle]}
                inputStyle={[basicInputStyle, passwordInputStyle]}
                onChangeText={
                  (UserPasswordConfirm) => setUserPasswordConfirm(UserPasswordConfirm)
                }
                placeholder="Konfirmasi password"
                placeholderTextColor={PlaceholderTextColor}
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                refChild={passwordConfirmInputRef}
              />
            </View>
            {(errortext != '') ? (
              <View style={bodySectionStyle}>
                <Text style={errorTextStyle}>
                  {errortext}
                </Text>
              </View>
            ) : null}
          </LinearGradient>
          <View style={bodySectionStyle}>
            <TouchableOpacity
              style={buttonInvertStyle}
              activeOpacity={0.5}
              onPress={handleCancelPress}
              >
              <Text style={buttonInvertTextStyle}>
                Batal
              </Text>
            </TouchableOpacity>
          </View>
          <View style={saveOptionBodySectionStyle}>
              <Text style={saveOptionTitleStyle}>
                atau
              </Text>
          </View>
          <View style={bodySectionStyle}>
            <TouchableOpacity
              style={buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
              >
              <Text style={buttonTextStyle}>
                Simpan
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
    </ScrollView>
  );

  return (
    <BodyBaseScreen items={baseScreenItems} />
  );
};

const mapStateToProps = state => {
  const { PageStyles } = state;
  return { PageStyles };
};

export default connect(mapStateToProps)(UserScreen);