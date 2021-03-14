import {
  StyleSheet,
} from 'react-native';

export const SplashStyles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    height: '100%',
    width: '100%',
    maxWidth: 300,
    resizeMode: 'contain',
    position: 'absolute'
  },
  versionTextStyle: {
    color: '#E37550',
    textAlign: 'center',
    fontFamily: 'montserrat',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 17,
    alignSelf: 'flex-end',
    marginBottom: 20,
    fontWeight: 'bold',
  },
});