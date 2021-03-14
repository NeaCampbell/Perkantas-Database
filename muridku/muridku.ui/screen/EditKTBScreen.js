import React from 'react';
import {
  View,
  Text
} from 'react-native';

// Import reducer dependencies
import { connect } from 'react-redux';

const EditKTBScreen = () => {
  return (
    <View>
      <Text>xxx</Text>
    </View>
  )
};

const mapStateToProps = state => {
  const { PageStyles } = state;
  return { PageStyles };
};

export default connect(mapStateToProps)(EditKTBScreen);