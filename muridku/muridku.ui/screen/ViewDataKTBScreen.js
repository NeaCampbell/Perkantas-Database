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
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';

import blueburger from '../asset/img/blueburger.png';
import refreshicon from '../asset/img/refresh.png';
import * as Icon from 'react-bootstrap-icons';

// Import reducer dependencies
import { connect } from 'react-redux';

// Import async storage for credential storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import needed views
import BodyBaseScreen from './BodyBaseScreen';
import PasswordToggle from './component/PasswordToggle';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';

const ViewDataKTBScreen = (props) => {
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
    <>
      <MenuBar></MenuBar>
      <KTBName></KTBName>
      <KTBBox></KTBBox>
    </>
  );

  return (
    <BodyBaseScreen items={baseScreenItems} />
  );
};

const MenuBar = () => {
  return (
    <View style={styles.menuBar}>
      <View>
        <Image source={blueburger} style={styles.burgerLogo}></Image>
      </View>
      <Text style={styles.namaAplikasi}>Profil KTB</Text>
      <View>
        <Image source={refreshicon} style={styles.refreshicon}></Image>
      </View>
    </View>
  );
}

const KTBName = () => {
  return (
    <View style={styles.KTBName}>      
      <Text style={styles.namaKTB}>Kelompok Tumbuh Bersama A</Text>
    </View>
  );
}

const KTBBox = () => {
  return (
    <>
    <View style={styleIsi.content}>
      <Text style={styleIsi.btnDoneKTB}><Icon.Check size={45}/></Text>
      <Text style={styleIsi.btnEditKTB}><Icon.Pencil size={25}/></Text>
      <Text style={styleIsi.btnDeleteKTB}><Icon.X size={45}/></Text>
      <Text style={styles.PaddingAtas}>Nama : </Text>
      <Text style={styles.lblText}>Nama : </Text>
      <Text style={styles.NameText}>
      <Icon.Person size={18}/>
      Candra Winardi</Text>
      <Text style={styles.lblText}>E-mail : </Text>
      <Text style={styles.NameText}>
      <Icon.Envelope size={18}/>
      candra.winardi@gmail.com</Text>
      <Text style={styles.lblText}>Alamat : </Text>
      <Text style={styles.NameText}>
      <Icon.HouseDoor size={18}/>
      Jalan</Text>
      <Text style={styles.lblText}>Tempat, Tanggal Lahir : </Text>
      <Text style={styles.NameText}>
      <Icon.CalendarEvent size={18}/>
      Bondowoso, 17 April 2021</Text>
      <Text style={styles.lblText}>Nomor Handphone : </Text>
      <Text style={styles.NameText}>
      <Icon.Phone size={18}/>
      087859042xxx</Text>
      <Text style={styles.lblText}>Kampus / Sekolah : </Text>
      <Text style={styles.NameText}>
      <Icon.Building size={18}/>
      Universitas Ma Chung</Text>
      <Text style={styles.lblText}>Bahan & Bab Terakhir : </Text>
      <Text style={styles.NameText}>
      <Icon.Book size={18}/>
      Kerikil-Kerikil Tajam</Text>
      <Text style={styles.lblText}>Pertemuan Terakhir : </Text>
      <Text style={styles.NameText}>
      <Icon.Calendar2Week size={18}/>
      20 Desember 2021</Text>
    </View>
    <View>
        
    </View>
    </>
  );
}

const BasicColor = '#004578';

const styleIsi = StyleSheet.create({
  btnDelKTB:{
    position: 'absolute',
    width: 56,
    height: 41.5,
    alignItems:'right',
    marginTop:170,
    marginLeft: 285,
  },
  btnDoneKTB:{
    position: 'absolute',
    alignItems:'right',
    marginLeft: 215,
    color: '#00780C'
  },
  btnEditKTB:{
    position: 'absolute',
    alignItems:'right',
    marginTop:10,
    color: BasicColor,
    marginLeft: 263,
  },
  btnDeleteKTB:{
    position: 'absolute',
    alignItems:'right',
    marginTop:0,
    marginLeft: 290,
    color: '#780000',
  },
  content:{
    position: 'absolute',
    width: 339,
    height: 375,
    backgroundColor: '#FFFFFF',
    borderWidth:1,
    borderColor: BasicColor,
    borderRadius: 20,
    margin:10,
    marginTop: 95,
  }
})

const styles = StyleSheet.create({
  mainBodyStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  globalFontStyle: {
    fontFamily: 'montserrat',
  },
  mainBodyImageStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  mainBodyImageCoverStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  titleInputStyle: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 17,
    color: BasicColor,
  },
  basicInputStyle: {
    flex: 1,
    color: '#000',
    borderColor: BasicColor,
    backgroundColor: 'white',
    width: '100%',
    fontSize: 12,
  },
  inputStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 5,
    height: 35,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  passwordInputStyle: {
    height: 30,
  },
  activityIndicatorStyle: {
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBar: {
    flexDirection: 'row',
    width: 360,
    height: 52,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: BasicColor,
  },
  burgerLogo: {
    position: 'absolute',
    color: BasicColor,
    width: 24,
    height: 17,
    left: '6.67%',
    right: '6.67%',
    top: '20%',
    bottom: '20%',
    marginLeft: 10,
    marginTop: 6,
  },
  refreshicon: {
    position: 'flex',
    color: BasicColor,
    width: 25,
    height: 25,
    left: '6.67%',
    right: '6.67%',
    top: '20%',
    bottom: '20%',
    marginRight: 17,
    marginTop: 1,
  },
  namaAplikasi:{
    fontSize: 16,
    fontFamily: '../asset/fonts/MontserratAlternates-Bold.ttf',
    fontWeight: 'bold',
    letterSpacing: 0.05,
    color: BasicColor,
    flex: 1,
    top: 14,
    marginLeft: 50,
    fontStyle: 'normal',
    display: 'flex',
    alignItems: 'center',
    lineHeight: 25,
  },
  namaKTB:{
    fontSize: 21,
    fontFamily: '../asset/fonts/MontserratAlternates-Bold.ttf',
    fontWeight: 'bold',
    letterSpacing: 0.05,
    color: 'white',
    flex: 1,
    top: 18,
    marginLeft: 20,
    fontStyle: 'normal',
    display: 'flex',
    alignItems: 'center',
    lineHeight: 25,
  },
  NameText:{
    fontSize: 14,
    fontFamily: '../asset/fonts/MontserratAlternates-Bold.ttf',
    fontWeight: 'bold',
    letterSpacing: 0.05,
    color: BasicColor,
    marginLeft: 10,
    display: 'flex',
    marginTop: 0.15
  },
  PaddingAtas:{
    fontSize: 14,
    letterSpacing: 0.05,
    color: '#ffffff',
    marginLeft: 30,
    display: 'flex',
    marginTop: 0.15
  },
  lblText:{
    fontSize: 14,
    fontFamily: '../asset/fonts/MontserratAlternates-Bold.ttf',
    fontWeight: 'bold',
    letterSpacing: 0.05,
    color: BasicColor,
    marginLeft: 10,
    display: 'flex',
    marginTop: 0.15
  },
});

const mapStateToProps = state => {
  const { PageStyles } = state;
  return { PageStyles };
};

export default connect(mapStateToProps)(ViewDataKTBScreen);