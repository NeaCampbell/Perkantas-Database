import {
  StyleSheet,
} from 'react-native';

export const BasicColor = '#F59873';

export const BasicStyles = StyleSheet.create({
  mainBodyStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  globalFontStyle: {
    fontFamily: 'arial',
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
    color: '#F4F8FC',
    outlineWidth: 0,
    backgroundColor: '#555671',
    width: '100%',
    fontSize: 12,
  },
  inputStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 35
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
});

export const LoadingViewSize = 50;
export const ContainerImageCoverColor = ['rgba(255,255,255,0.5)', 'rgba(250,231,224,0.8)'];
export const InputWrapperColor = ['rgba(255,255,255,0.5)', 'rgba(250,231,224,1)'];
export const PlaceholderTextColor = '#AAA';