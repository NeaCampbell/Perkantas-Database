import {
  StyleSheet,
} from 'react-native';
import { WindowSize, HeightPercentageToDP } from '../../helper/CommonHelper';

const BackgroundColor = "#2A2C4E";

export const SplashStyles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    backgroundColor: BackgroundColor
  },
  imgContainerStyle: {
    width: '100%',
    height: HeightPercentageToDP(WindowSize.width > WindowSize.height ? 350 : 500),
    alignItems: 'flex-start',
    position: 'absolute'
  },
  imgStyle: {
    height: '60%',
    width: '100%',
    resizeMode: WindowSize.width > WindowSize.height ? 'center' : 'cover',
    aspectRatio: 1,
  },
  logoContainerStyle: {
    width: '100%',
    height: HeightPercentageToDP(125),
    alignItems: 'center',
    marginTop: HeightPercentageToDP(WindowSize.width > WindowSize.height ? 250 : 300)
  },
  logo2ContainerStyle: {
    width: '100%',
    height: HeightPercentageToDP(50),
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  logoStyle: {
    height: '70%',
    width: '70%',
    resizeMode: 'contain',
    position: 'absolute'
  },
  versionContainerStyle: {
    width: '100%',
    height: HeightPercentageToDP(50),
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  versionTextStyle: {
    color: '#CCC',
    textAlign: 'center',
    height: '100%',
    width: '100%',
    fontFamily: 'arial',
    fontStyle: 'normal',
    fontSize: HeightPercentageToDP(10),
    lineHeight: HeightPercentageToDP(17),
    alignSelf: 'flex-end'
  },
});