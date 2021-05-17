import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import { BasicStyles } from '../asset/style-template/BasicStyles';
import { ViewDataKTBStyles } from '../asset/style-template/ViewDataKTBStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ProportionateScreenSizeValue
} from '../helper/CommonHelper';
import { SET_SELECTED_MEMBER } from "../reducer/action/ActionConst";

const ViewDataKTBScreen = (props) => {
  const { navigation } = props;
  const { globalFontStyle } = BasicStyles;
  const {
    bodyContainerStyle,
    searchSectionStyle,
    footerButtonStyle,
    buttonStyle,
    bodySectionStyle,
    nameButtonTextStyle,
    cityButtonTextStyle,
    photoStyle,
    buttonFooterStyle
  } = ViewDataKTBStyles;

  const getTwoWordName = (name) => {
    let nameArr = name.split(" ");
    let result = "";

    for(let i = 0; i < nameArr.length && i < 2; i++) {
      result += (result !== "" ? " " : "") + nameArr[i];
    }

    return result;
  }

  const onMemberClick = (id) => {
    const selectedMembers = props.KTB.members.filter((data) => {return data.id === id});

    if(selectedMembers.length === 0)
      return;

    const selectedMember = selectedMembers[0];
    props.dispatch({ type: SET_SELECTED_MEMBER, member: selectedMember });
    navigation.replace('EntryDataAKKScreen');
  }

  let disciple = [];
  
  if(props.KTB.members.length > 0)
    props.KTB.members.forEach((item) => {
      disciple.push(
        (
          <View style={[bodySectionStyle, {flex: 2.5}]} key={item.id}>
            <TouchableOpacity
              style={buttonStyle}
              activeOpacity={0.5}
              onPress={() => onMemberClick(item.id)}
            >
              <Image
                source={require('../asset/img/man.png')}
                style={photoStyle}
              />
              <Text style={[globalFontStyle, nameButtonTextStyle]}>
                {getTwoWordName(item.name)}
              </Text>
              <Text style={[globalFontStyle, cityButtonTextStyle]}>
                {item.address !== undefined && item.address !== null && item.address !== "" ? item.address : "-"}
              </Text>
            </TouchableOpacity>
          </View>
        )
      )
    });

  const child = (
    <View style={bodyContainerStyle}>
      <View style={searchSectionStyle}>
          <View style={{flexDirection: 'row', flex: 7}}>
            {disciple}
          </View>
      </View>
    </View>
  );

  const footer = (
    <View style={searchSectionStyle}>
      <View style={footerButtonStyle}>
        <TouchableOpacity
          style={buttonFooterStyle}
          activeOpacity={0.5}
          onPress={() => addGroup()}
        >
          <Icon name="add" size={ProportionateScreenSizeValue(25)} color="white"></Icon>
        </TouchableOpacity>
      </View>
      <View style={footerButtonStyle}>
        <TouchableOpacity
          style={buttonFooterStyle}
          activeOpacity={0.5}
          onPress={() => deleteGroup()}
          disabled={true}
        >
          <Icon name="edit" size={ProportionateScreenSizeValue(25)} color="white"></Icon>
        </TouchableOpacity>
      </View>
      <View style={footerButtonStyle}>
        <TouchableOpacity
          style={buttonFooterStyle}
          activeOpacity={0.5}
          onPress={() => deleteGroup()}
          disabled={true}
        >
          <Icon name="history" size={ProportionateScreenSizeValue(25)} color="white"></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <BodyMenuBaseScreen title={`Kelompok ${props.KTB.name}`} child={child} footer={footer} />
  );
};

const mapStateToProps = state => {
  const { User, KTB } = state;
  return { User, KTB };
};

export default connect(mapStateToProps)(ViewDataKTBScreen);