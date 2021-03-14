import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class PasswordToggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    }
  }

  setVisible(visible) {
    this.setState({
      visible: visible,
    });
  }

  render() {
    return (
      <View style={[this.props.containerStyle, styles.container]}>
        {this.props.icon && <Icon name={this.props.icon} size={this.props.iconSize} color={this.props.iconColor} />}
        <TextInput secureTextEntry={this.state.visible} {...this.props} style={[this.props.inputStyle]} ref={this.props.refChild}/>
        <TouchableOpacity
          onPress={() => {
            this.setVisible(!this.state.visible);
          }}>
          <Icon
            name={this.state.visible ? 'visibility-off' : 'visibility'}
            size={this.props.iconSize}
            color={this.state.visible ? this.props.iconInvisibleColor : this.props.iconVisibleColor}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
  }
});

PasswordToggle.defaultProps = {
  icon: null,
  style: {},
  iconVisibleColor: '#222',
  iconInvisibleColor: '#777',
  iconSize: 20,
  inputStyle:{}
};

