import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ViewAllKTBStyles } from '../../asset/style-template/ViewAllKTBStyles';
import { BasicStyles, BasicColor, LoadingViewSize, PlaceholderTextColor } from '../../asset/style-template/BasicStyles';

export default class KelompokKTB extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      ColorHolder: '#00BCD4',
    }
  }

  setVisible(visible) {
    this.setState({
      visible: visible,
    });
  }

ChangeColorFunction=()=>{
var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    this.setState({
        ColorHolder : ColorCode
    })
}

render() {
    return (
      <View style={[this.props.containerStyle, {color: this.state.ColorHolder}]}>
          <View style={{flexDirection:'row', flex:1}}>
            <View>
                <Text style={{color:'#000000', size:12, fontWeight:'bold', paddingRight:150}}>
                    {this.props.namaKTB}
                </Text>
            </View>
            <View>     
                <Text style={{color:'#D2A4A8', size:12}}>
                    {this.props.reminder}
                </Text>
            </View>
          </View>
          <View style={{flex:1}}>
            <Text style={{color:'#D2A4A8', size:12}}>
                {this.props.jadwal}
            </Text>
          </View>
          <View style={{flexDirection:'row', paddingLeft:5}}>
            <Image source={this.props.anggota2} style={ViewAllKTBStyles.iconUser}></Image> 
            <Image source={this.props.anggota2} style={ViewAllKTBStyles.iconUser}></Image> 
            <Image source={this.props.anggota3} style={ViewAllKTBStyles.iconUser}></Image> 
          </View>
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
  
  KelompokKTB.defaultProps = {
    icon: null,
    style: {},
    iconVisibleColor: '#222',
    iconInvisibleColor: '#777',
    iconSize: 20,
    inputStyle:{}
  };
