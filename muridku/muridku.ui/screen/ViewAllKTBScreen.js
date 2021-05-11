import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Vector2 from '../asset/img/burger.png';
import Vector1 from '../asset/img/user-logo.png';
import Vector3 from '../asset/img/button-edit-rvs.png';
import Vector4 from '../asset/img/button-add.png';

// Import reducer dependencies
import { connect } from 'react-redux';

// Import needed views
import BodyBaseScreen from './BodyBaseScreen';

const ViewAllKTBScreen = () => {
  const baseScreenItems = (
    <>
      <MenuBar></MenuBar>
      <Isi></Isi>
    </>
  );

  return (
    <BodyBaseScreen items={baseScreenItems} />
  );
}

const MenuBar = () => {
  return (
    <View style={styles.menuBar}>
      <View>
        <Image source={Vector2} style={styles.burgerLogo}></Image>
      </View>
      <Text style={styles.namaAplikasi}>Muridku</Text>
    </View>
  );
}

const Isi = () => {
  return (
    <View style={styleIsi.content}>
      <View style={{alignItems:'center',}}>
        <Image source={Vector1} style={styleIsi.logoUser}></Image>
        <Text style={styleIsi.namaUser}>Hi, Luhur Dimas P.</Text>
      </View>
      <Text style={styleIsi.ktb}>KELOMPOK TUMBUH BERSAMA</Text>
      <View>
        <KelompokKTB namaKTB='Kelompok A'></KelompokKTB>
        <KelompokKTB namaKTB='Kelompok B'></KelompokKTB>
        <KelompokKTB namaKTB='Kelompok C'></KelompokKTB>
        <KelompokKTB namaKTB='Kelompok D'></KelompokKTB>
        <KelompokKTB namaKTB='Kelompok E'></KelompokKTB>
        <KelompokKTB namaKTB='Kelompok F'></KelompokKTB>
      </View>
      <View style={{alignItems:'center'}}>
        <Image source={Vector4} style={styleIsi.btnTambahKTB}></Image>
      </View>
    </View>
  );
}

const KelompokKTB = (props) => {
  return (
    <View style={styleIsi.kelKtb}>
      <Text style={styleIsi.ktbList}>{props.namaKTB}</Text>
      <Image source={Vector3} style={styleIsi.btnKtbEdit}></Image>
    </View>
  );
}

const BasicColor = BasicColor;

const styleIsi = StyleSheet.create({
  logoUser: {
    position: 'absolute',
    width: 62,
    height: 62,
    left: '40%',
    marginTop: 20,
    backgroundColor: BasicColor,
  },
  namaUser:{
    fontSize: 16,
    fontFamily: '../asset/fonts/MontserratAlternates-Bold.ttf',
    fontWeight: 'bold',
    color: BasicColor,
    top: 14,
    fontStyle: 'normal',
    //alignItems: 'center',
    lineHeight: 20,
    marginTop: 85,
  },
  ktb:{
    width:310,
    fontSize: 18,
    fontFamily: '../asset/fonts/MontserratAlternates-Bold.ttf',
    fontWeight: 'bold',
    letterSpacing: 0.05,
    color: BasicColor,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: BasicColor,
    marginTop: 30,
    marginLeft:14,
    textAlign: 'center',
    alignItems: 'center',
  },
  kelKtb:{
    width: 310,
    height: 35,
    flexDirection: 'row',
    marginLeft:14,
    marginTop:10,
    alignItems: 'center',
  },
  ktbList:{
    width:246,
    height:18,
    fontSize: 14,
    fontFamily: '../asset/fonts/MontserratAlternates-Bold.ttf',
    fontWeight: 'bold',
    lineHeight: 18,
    color: BasicColor,
    display:'flex',
    alignItems:'center',
    flex:4,
  },
  btnKtbEdit:{
    position: 'absolute',
    width: 49,
    height: 35,
    backgroundColor: BasicColor,
    borderWidth: 1,
    borderColor: 'white',
    flex:1,
    marginLeft: 260,
  },
  btnTambahKTB:{
    position: 'absolute',
    width: 56,
    height: 41.5,
    alignItems:'center',
    marginTop:10,
  },
  content:{
    position: 'absolute',
    width: 339,
    height: 538,
    backgroundColor: '#FFFFFF',
    borderWidth:1,
    borderColor: BasicColor,
    borderRadius: 20,
    margin:10,
    marginTop: 65,
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
    width: 24,
    height: 17,
    left: '6.67%',
    right: '6.67%',
    top: '20%',
    bottom: '20%',
    marginLeft: 10,
    marginTop: 6,
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
});

const mapStateToProps = state => {
  const { PageStyles } = state;
  return { PageStyles };
};

export default connect(mapStateToProps)(ViewAllKTBScreen);