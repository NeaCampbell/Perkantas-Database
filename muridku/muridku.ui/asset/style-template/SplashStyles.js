import {
  StyleSheet,
} from 'react-native';

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
    resizeMode: 'center',
    position: 'absolute'
  },
  versionTextStyle: {
    color: '#CCC',
    textAlign: 'center',
    height: '100%',
    width: '100%',
    fontFamily: 'arial',
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 17,
    alignSelf: 'flex-end'
  },
});