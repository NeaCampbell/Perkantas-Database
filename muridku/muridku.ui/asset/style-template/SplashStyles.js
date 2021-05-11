import {
  StyleSheet,
} from 'react-native';
import { HeightPercentageToDP } from '../../helper/CommonHelper';

const BackgroundColor = "#2A2C4E";

export const SplashStyles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: BackgroundColor,
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    aspectRatio: 1,
    position: 'absolute'
  },
  logoStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    position: 'absolute'
  },
  versionTextStyle: {
    color: '#CCC',
    textAlign: 'center',
    height: '100%',
    width: '100%',
    fontFamily: 'arial',
    fontStyle: 'normal',
    fontSize: HeightPercentageToDP(12),
    lineHeight: HeightPercentageToDP(17),
    alignSelf: 'flex-end'
  },
});