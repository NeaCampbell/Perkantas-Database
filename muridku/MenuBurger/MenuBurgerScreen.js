// Import React and Component
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';

// Import reducer dependencies
import { connect } from 'react-redux';

// Import needed views
import BodyBaseScreen from './BodyBaseScreen';

const MenuBurger = (props) => {

  const {bodyTextStyle} = props.PageStyles.BasicStyles;
  
  const {
    bodyContainerStyle,
    bodySectionTitleStyle, 
  } = props.PageStyles.LoginStyles;

  const baseScreenItems = (
    <ScrollView
      contentContainerStyle={bodyContainerStyle}>
      <View style={styles.BurgerBackground}>
      <ImageBackground source={require('../asset/img/bg-vector.png')} 
      style={styles.BurgerBackground}>
        <View style={bodySectionTitleStyle}>
          <View style={styles.BurgerHead}></View>
          <Text style={styles.titleTextStyle}>MURIDKU</Text>
        </View>
            <View style={styles.BurgerMenu}>
              <Image source={require('../asset/img/bg-icon.png')}
                style={styles.BackgroundIcon}/>
                <Image
                source={require('../asset/img/b-dataktb.png')}
                style={styles.BurgerKTB}/>
                <Text style={styles.bodyTextStyle}>Data KTB</Text>
            </View>    
            <View style={styles.BurgerMenu}>
              <Image source={require('../asset/img/bg-icon.png')}
                style={styles.BackgroundIcon}/>
                <Image
                source={require('../asset/img/b-profile.png')}
                style={styles.BurgerProfile}/>
                <Text style={styles.bodyTextStyle}>Profile</Text>
            </View>
            <View style={styles.BurgerMenu}>
              <Image source={require('../asset/img/bg-icon.png')}
                style={styles.BackgroundIcon}/>
                <Image
                source={require('../asset/img/b-aktivasi.png')}
                style={styles.BurgerAktivasi}/>
                <Text style={styles.bodyTextStyle}>Aktivasi</Text>
            </View>            
        <View style={styles.BurgerFoot}>
          <Image
          source={require('../asset/img/b-logout.png')}
          style={styles.BurgerLogOut}/>
          <Text style={styles.bodyTextStyle}>Logout</Text>
        </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );

  return (
    <BodyBaseScreen items={baseScreenItems} />
  );
};

const styles = StyleSheet.create ({
  titleTextStyle: {
    width:230, 
    height:55, 
    color: '#0011ff',
    outlineWidth: 0.5,
    borderColor: '#000000',
    width: '100%',
    fontSize: 45,
    marginTop: 30,
    marginBottom: 30,
  },
  bodyTextStyle: {
    position: 'absolute',
    fontFamily: 'montserrat',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 17,
    bottom: 0,
    marginBottom: 20,
    color: '#3B4859',
  },
BurgerBackground: {
  flex: 1,
  width:"100%",
  height: "100%",
  alignSelf: "flex-start",
},
BurgerHead: {
  flex: 1,
},
BurgerMenu: {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 20,
},
BurgerFoot:{
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 60,
},
BackgroundIcon: {
  flex: 1,
  width:130, 
  height:130, 
},
BurgerKTB: {
  position: 'absolute',
  width:60, 
  height:60,
  top: 0,
  marginTop:20,
  marginBottom:10,
},
BurgerProfile: {
  position: 'absolute',
  width:60, 
  height:80,
  top: 0,
  marginTop: 5,
  marginBottom:10,
},
BurgerAktivasi: {
  position: 'absolute',
  width:65, 
  height:60,
  top: 0,
  marginTop: 20,
  marginBottom:10,
},
BurgerLogOut:{
  position: 'absolute',
  width: 100,
  height: 100,
  Top:0,
  marginTop: 20,
  marginBottom:10,
}
})

const mapStateToProps = state => {
  const { PageStyles } = state;
  return { PageStyles };
};

export default connect(mapStateToProps)(MenuBurger);