// Import React and Component
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';

// Import reducer dependencies
import { connect } from 'react-redux';

// Import needed views
import BodyBaseScreen from './BodyBaseScreen';

const MenuBurger = (props) => {

  const {titleInputStyle} = props.PageStyles.BasicStyles;
  
  const {
    bodyContainerStyle,
    bodySectionTitleStyle,
  } = props.PageStyles.LoginStyles;

  const baseScreenItems = (
    <ScrollView
      contentContainerStyle={bodyContainerStyle}>
      <View style={styles.BurgerBackground}>
        <View style={bodySectionTitleStyle}>
          <View style={styles.BurgerHead}>
            <Image
            source={require('../asset/img/logo.png')}
            style={styles.Logosmall}
            />
            <Image
            source={require('../asset/img/account.png')}
            style={styles.BurgerAccount}
            />
            <Text style={titleInputStyle}>Hi, Luhur Dimas P.</Text>
            <Image
            source={require('../asset/img/Line1.png')}
            style={styles.BurgerLine}
            />
          </View>
        </View>
        <View style={styles.BurgerMenu}>
          <Text style={titleInputStyle}>Data User</Text>
          <Image
          source={require('../asset/img/button-update.png')}
          style={styles.BurgerUpdate}
          />
          <Text style={titleInputStyle}>Data KTB</Text>
          <Image
          source={require('../asset/img/button-update.png')}
          style={styles.BurgerUpdate}
          />
        </View>
        <View style={styles.BurgerFoot}>
          <Image
          source={require('../asset/img/sign-out.png')}
          style={styles.BurgerSignOut}
          />
          <Text style={titleInputStyle}>Sign Out</Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <BodyBaseScreen items={baseScreenItems} />
  );
};

const styles = StyleSheet.create ({
BurgerBackground: {
  flex: 1,
  width:262,
  alignSelf: "flex-start",
  backgroundColor: '#FAE7E0',
},
BurgerHead: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
Logosmall: {
  width:173, 
  height:50, 
  marginBottom:20,
},
BurgerAccount: {
  width:60, 
  height:60, 
  marginBottom:20,
},
BurgerLine: {
  width: 224, 
  height:3, 
  marginTop:10, 
  marginBottom:20,
},
BurgerMenu: {
  marginLeft:15,
},
BurgerUpdate: {
  width:41,
  height:30,
  marginLeft:191,
  top:-25,
},
BurgerFoot:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop:232,
},
BurgerSignOut:{
  width: 34,
  height: 26,
}
})

const mapStateToProps = state => {
  const { PageStyles } = state;
  return { PageStyles };
};

export default connect(mapStateToProps)(MenuBurger);