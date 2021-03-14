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

const LoginScreen = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const { navigation } = props;

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
      setLoading(false);
      // setErrortext('Internal server error.\n Mohon kontak tim support.');
      // console.error(error);
      navigation.replace('UserScreen');
    });
  };

  const { globalFontStyle, titleInputStyle, basicInputStyle, inputStyle, passwordInputStyle } = props.PageStyles.BasicStyles;
  
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
    forgotPwdTextStyle,
    loginWithGoogleStyle,
    loginWithGoogleTextStyle,
    techProblemDescStyle,
    techProblemStyle,
    googleLogoStyle,
    customActivityIndicatorStyle
  } = props.PageStyles.LoginStyles;

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
              <Text style={[globalFontStyle, titleInputStyle]}>Email</Text>
            </View>
            <View style={bodySectionStyle}>
              <TextInput
                style={[globalFontStyle, basicInputStyle, inputStyle]}
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
              <Text style={[globalFontStyle, titleInputStyle]}>Password</Text>
            </View>
            <View style={bodySectionStyle}>
              <PasswordToggle
                containerStyle={[globalFontStyle, basicInputStyle, inputStyle]}
                inputStyle={[globalFontStyle, basicInputStyle, passwordInputStyle]}
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
            {(errortext != '') ? (
              <View style={bodySectionStyle}>
                <Text style={[globalFontStyle, errorTextStyle]}>
                  {errortext}
                </Text>
              </View>
            ) : null}
            <View style={bodySectionStyle}>
              <TouchableOpacity
                style={buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmitPress}
                >
                <Text style={[globalFontStyle, buttonTextStyle]}>
                  Masuk
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={bodySectionStyle}
              // onPress={() => navigation.navigate('RegisterScreen')}
              >
              <Text
                style={[globalFontStyle, forgotPwdTextStyle]}>
                Lupa Password ?
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <TouchableOpacity activeOpacity={0.5} style={loginWithGoogleStyle}>
            <Image
              source={require('../asset/img/google.png')}
              style={googleLogoStyle}
            />
            <Text style={[globalFontStyle, loginWithGoogleTextStyle]}>
              Masuk dengan Google
            </Text>
          </TouchableOpacity>
          <View style={bodySectionStyle}>
            <Text style={[globalFontStyle, techProblemDescStyle]}>Kesulitan mengakses akun MURIDKU?</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={bodySectionStyle}>
            <Text
              style={[globalFontStyle, techProblemStyle]}>
              Laporkan masalah teknis
            </Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps)(LoginScreen);