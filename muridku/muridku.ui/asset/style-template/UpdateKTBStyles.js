/* eslint-disable prettier/prettier */
import {
    StyleSheet,
  } from 'react-native';

  export const UpdateKTBStyles = StyleSheet.create({
    bodyContainerStyle: {
      position: 'absolute',
      width: '80%',
      height: '35%',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      alignSelf: 'center',
      padding:15,
    },
    bodyContainerStyle2: {
        position: 'absolute',
        width: '80%',
        height: '25%',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        padding:15,
      },
    bodySectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 5,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'center',
    },
    groupInputStyle: {
        flex: 1,
        color: '#092058',
        backgroundColor: '#f8f8fa',
        width: '100%',
        height: 50,
        fontSize: 14,
        padding: 5,
        marginBottom: 20,
    },
    buttonStyle: {
        backgroundColor: '#E37550',
        color: '#FFFFFF',
        height: 35,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 8,
        fontStyle: 'normal',
        fontSize: 14,
        lineHeight: 17,
    },
});
