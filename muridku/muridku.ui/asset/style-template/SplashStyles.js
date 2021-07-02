/* eslint-disable prettier/prettier */
import {
  StyleSheet,
} from 'react-native';
import { WindowSize, ProportionateScreenSizeValue } from '../../helper/CommonHelper';

const BackgroundColor = '#2A2C4E';

export const SplashStyles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BackgroundColor,
    borderColor: '#FFF',
  },
  imgContainerStyle: {
    width: '100%',
    height: WindowSize.height * 60 / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    aspectRatio: 1,
  },
  logoContainerStyle: {
    width: '100%',
    height: WindowSize.height * 20 / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    height: '60%',
    width: '60%',
    resizeMode: 'contain',
  },
  logo2ContainerStyle: {
    width: '100%',
    height: WindowSize.height * 15 / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo2Style: {
    height: '30%',
    width: '60%',
    resizeMode: 'contain',
  },
  versionContainerStyle: {
    width: '100%',
    height: WindowSize.height * 5 / 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionTextStyle: {
    color: '#CCC',
    textAlign: 'center',
    height: '100%',
    width: '100%',
    fontFamily: 'arial',
    fontStyle: 'normal',
    fontSize: ProportionateScreenSizeValue(10),
    lineHeight: ProportionateScreenSizeValue(17),
    alignSelf: 'flex-end',
  },
});
