import React from 'react';
import {
  View,
  ImageBackground,
} from 'react-native';

// Import linear gradient component
import { LinearGradient } from 'expo-linear-gradient';
  
// Import reducer dependencies
import { connect } from 'react-redux';

const BodyBaseScreen = (props) => {
  const { mainBodyStyle, mainBodyImageStyle, mainBodyImageCoverStyle } = props.PageStyles.BasicStyles;
  const { ContainerImageCoverColor } = props.PageStyles;

  return (
    <View style={mainBodyStyle}>
      <ImageBackground source={require('../asset/img/bg-vector.png')} style={mainBodyImageStyle}>
        <LinearGradient colors={ContainerImageCoverColor} style={mainBodyImageCoverStyle}>
          {props.items}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const mapStateToProps = state => {
  console.log(state);
  const { PageStyles } = state;
  return { PageStyles };
};

export default connect(mapStateToProps)(BodyBaseScreen);