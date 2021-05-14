import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BasicStyles } from '../../asset/style-template/BasicStyles';
import { DiscipleshipGroupStyles } from '../../asset/style-template/DiscipleshipGroupStyles';

export default class DiscipleshipGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      ColorHolder: props.colorHolder,
    }
  }

  setVisible(visible) {
    this.setState({
      visible: visible,
    });
  }

  getFirstLetterName(name) {
    let nameArr = name.split(" ");
    let result = "";

    for(let idx = 0; idx < nameArr.length && idx < 2; idx++)
      result += nameArr[idx][0];

    return result;
  }

  onGroupClick(id, onGroupClick) {
    if(onGroupClick)
      onGroupClick(id);
  }

  onMemberClick(id, onMemberClick) {
    if(onMemberClick)
      onMemberClick(id);
  }

  render() {
    let members = [];

    const {
      globalFontStyle
    } = BasicStyles;

    const {
      ktbBoxSectionStyle,
      descSectionStyle,
      otherDescSectionStyle,
      groupSectionStyle,
      groupNameStyle,
      memberSectionStyle,
      iconUserStyle,
      iconUserTextStyle,
      otherDescValueStyle,
      otherDescTextStyle,
    } = DiscipleshipGroupStyles;

    this.props.members.forEach(element => {
      members.push(
        <TouchableOpacity
          style={iconUserStyle}
          activeOpacity={0.3}
          key={element.id}
          onPress={() => this.onMemberClick(element.id, this.props.onMemberClick)}
        >
          <Text style={iconUserTextStyle}>{this.getFirstLetterName(element.name)}</Text>
        </TouchableOpacity>
      );
    });

    return (
      <TouchableOpacity
        style={[globalFontStyle, ktbBoxSectionStyle, {backgroundColor: this.state.ColorHolder}]}
        activeOpacity={0.8}
        onPress={() => this.onGroupClick(this.props.group.id, this.props.onGroupClick)}
        delayLongPress={300}
        onLongPress={this.props.onLongPress}
      >
        <View style={descSectionStyle}>
          <View style={groupSectionStyle}>
            <Text style={groupNameStyle}>
              {this.props.group.name}
            </Text>
          </View>
          <View style={memberSectionStyle}>
            {members}
          </View>
        </View>
        <View style={[descSectionStyle, otherDescSectionStyle]}>
          <View style={groupSectionStyle}>
            <Text style={otherDescTextStyle}>
              Tgl Pertemuan Terakhir
            </Text>
          </View>
          <View style={otherDescValueStyle}>
            <Text style={otherDescTextStyle}>
              {this.props.group.last_meet_dt ?? "-"}
            </Text>
          </View>
        </View>
        <View style={[descSectionStyle, otherDescSectionStyle]}>
          <View style={groupSectionStyle}>
            <Text style={otherDescTextStyle}>
              Bahan Terakhir
            </Text>
          </View>
          <View style={otherDescValueStyle}>
            <Text style={otherDescTextStyle}>
              {this.props.group.last_meet_name ?? "-"}
            </Text>
          </View>
        </View>
        <View style={[descSectionStyle, otherDescSectionStyle]}>
          <View style={groupSectionStyle}>
            <Text style={otherDescTextStyle}>
              Bab Terakhir
            </Text>
          </View>
          <View style={otherDescValueStyle}>
            <Text style={otherDescTextStyle}>
              {this.props.group.last_meet_chapter ?? "-"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}