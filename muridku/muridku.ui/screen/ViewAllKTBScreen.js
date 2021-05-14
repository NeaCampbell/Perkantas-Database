import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  CheckBox,
  BackHandler,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import SearchToggle from './component/SearchToggle';
import DiscipleshipGroup from './component/DiscipleshipGroup';
import { BasicStyles, BasicColor, PlaceholderTextColor } from '../asset/style-template/BasicStyles';
import { ViewAllKTBStyles } from '../asset/style-template/ViewAllKTBStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ProportionateScreenSizeValue
} from '../helper/CommonHelper';

const getktbapi = require('../api/out/getktbsbypktbid');

const ViewALLKTBScreen = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const [ktbs, setKtbs] = useState([]);
  const [searchedKtbs, setSearchedKtbs] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchPressed, setSearchPressed] = useState(false);
  const [groupLongPressed, setGroupLongPressed] = useState(false);
  
  const resetState = () => {
    setLoading(true);
    setKtbs([]);
    setSearchedKtbs([]);
    setSearchKey("");
    setSearchPressed(false);
    setGroupLongPressed(false);
  };

  const onBackPressed = () => {
    console.log("test");
    setGroupLongPressed(false);
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onBackPressed);

    return () => BackHandler.removeEventListener("hardwareBackPress", onBackPressed);
  }, []);

  const callback = (result) => {
    setLoading(false);

    if(!result.succeed)
      return;

    setKtbs(result.result);
  }

  const onSearch = (searchKey) => {
    if(ktbs.length === 0)
      return;
    
    setSearchPressed(true);

    if(searchKey === undefined || searchKey === null || searchKey === "")
    {
      setSearchedKtbs(ktbs);
      return;
    }

    const filterKtbs = (data) => {
      console.log(data.ktb.name.toLowerCase().search(searchKey.toLowerCase()));
      return data.ktb.name.toLowerCase().search(searchKey.toLowerCase()) > -1;
    };

    setSearchedKtbs(ktbs.filter(filterKtbs));
  }

  const onGroupClick = (id) => {
    console.log(`test ${id}`);
    resetState();
    navigation.navigate('AddKTBHistoryScreen');
  }

  const onMemberClick = (id) => {
    console.log(`test member ${id}`);
    resetState();
  }

  const onLongPress = () => {
    console.log("test");
    setGroupLongPressed(true);
  };

  const addGroup = () => {
    console.log("add group");
  };

  const deleteGroup = () => {
    console.log('delete group');
  };

  if(loading)
    getktbapi.getktbsbypktbid(props.User.memberId, callback);

  const ChangeColorFunction = (oldColor) => {
    const getRandomNo = () => {
      let res = Math.random();
      const minValue = 0.85;

      while(res < minValue)
        res = Math.random();
      
      return res;
    };

    const colorTolerance = 5;
    let r = Math.floor(getRandomNo() * 255);
    let g = Math.floor(getRandomNo() * 255);

    while(g >= r - colorTolerance && g <= r + colorTolerance)
      g = Math.floor(getRandomNo() * 255);
    
    let b = Math.floor(getRandomNo() * 255);
    
    while((b >= r - colorTolerance && b <= r + colorTolerance) || (b >= g - colorTolerance && b <= g + colorTolerance))
      b = Math.floor(getRandomNo() * 255);

    const result = `rgb(${r},${g},${b})`;

    if(result === oldColor)
      return ChangeColorFunction(oldColor);

    return result;
  }

  const groupCount = ktbs.length;
  const groupColors = [];

  for(let i = 0; i < groupCount; i++) {
    let color = ChangeColorFunction( i === 0 ? '' : groupColors[i-1] );
    groupColors.push(color);
  }

  const { globalFontStyle, basicInputStyle } = BasicStyles;
  
  const {
    bodyContainerStyle,
    searchSectionStyle,
    searchContainerStyle,
    searchTextStyle,
    footerButtonStyle,
    buttonStyle,
    customActivityIndicatorStyle
  } = ViewAllKTBStyles;

  const setKtbsComp = (groups) => {
    let comps = [];
    let idx = 0;
    groups.forEach(element => {
      if(!groupLongPressed)
        comps.push(
          <View style={{flexDirection: 'row'}} key={idx}>
            <DiscipleshipGroup
              group={element.ktb}
              members={element.members}
              colorHolder={groupColors[idx]}
              key={idx}
              navigation={navigation}
              onGroupClick={onGroupClick}
              onMemberClick={onMemberClick}
              onLongPress={onLongPress}
            />
          </View>
        );
      else
        comps.push(
          <View style={{flexDirection: 'row'}} key={idx}>
            <DiscipleshipGroup
              group={element.ktb}
              members={element.members}
              colorHolder={groupColors[idx]}
              key={idx}
              navigation={navigation}
              onLongPress={onLongPress}
            />
              <CheckBox></CheckBox>
          </View>
        );

      idx++;
    });

    return comps;
  }

  let groups = undefined;

  if(!loading && ktbs.length > 0)
  {
    if(searchPressed)
      groups = setKtbsComp(searchedKtbs);
    else
      groups = setKtbsComp(ktbs);
  }

  const child = (
    <View style={bodyContainerStyle}>
      <View style={searchSectionStyle}>
        <KeyboardAvoidingView style={searchContainerStyle}
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <SearchToggle
            containerStyle={[basicInputStyle, searchContainerStyle]}
            inputStyle={[globalFontStyle, basicInputStyle, searchTextStyle]}
            placeholder="Cari KTB"
            placeholderTextColor={PlaceholderTextColor}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
            iconSize={ProportionateScreenSizeValue(20)}
            value={searchKey}
            onChangeText={setSearchKey}
            onSearchSubmit={onSearch}
          />
        </KeyboardAvoidingView>
      </View>
      <ScrollView>
        <View style={[{flexDirection: 'column', flex: 1}]}>
          {groups}
        </View>
      </ScrollView>
      {(loading) ? 
        (<View style={customActivityIndicatorStyle}>
          <ActivityIndicator
            animating={loading}
            color={BasicColor}
            size={ProportionateScreenSizeValue(ProportionateScreenSizeValue(30))}
          />
        </View>) : null
      }
    </View>
  );

  const footer = (
    <View style={[searchSectionStyle, {flexDirection:'row'}]}>
      <View style={footerButtonStyle}>
        <TouchableOpacity
          style={buttonStyle}
          activeOpacity={0.5}
          onPress={() => addGroup()}
        >
          <Icon name="add" size={ProportionateScreenSizeValue(25)} color="white"></Icon>
        </TouchableOpacity>
      </View>
      <View style={footerButtonStyle}>
        <TouchableOpacity
          style={buttonStyle}
          activeOpacity={0.5}
          onPress={() => deleteGroup()}
        >
          <Icon name="delete" size={ProportionateScreenSizeValue(25)} color="white"></Icon>
        </TouchableOpacity>
      </View>
      <Button
        title="Back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );

  return (
    <BodyMenuBaseScreen title="KTB" child={child} footer={footer} />
  );
};

const mapStateToProps = state => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps)(ViewALLKTBScreen);