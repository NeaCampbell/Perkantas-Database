import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Text
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
import { SET_SELECTED_KTB } from "../reducer/action/ActionConst";

const getktbapi = require('../api/out/getktbsbypktbid');
const getktbbyidapi = require('../api/out/getktbbyktbid');

const ViewALLKTBScreen = (props) => {
  const selectAll = "Select All";
  const unselectAll = "Unselect All";
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const [isFirstEntry, setIsFirstEntry] = useState(true);
  const [ktbs, setKtbs] = useState([]);
  const [searchedKtbs, setSearchedKtbs] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchPressed, setSearchPressed] = useState(false);
  const [checkedMode, setCheckedMode] = useState(false);
  const [selectedKtbs, setSelectedKtbs] = useState([]);
  const [selectAllText, setSelectAllText] = useState(selectAll);
  const [forceGroupCheck, setForceGroupCheck] = useState(false);
  const [forceGroupUncheck, setForceGroupUncheck] = useState(false);
  
  const resetState = (needResetData = true) => {
    setSearchKey("");
    setSearchPressed(false);
    setCheckedMode(false);
    setSelectedKtbs([]);
    setSelectAllText(selectAll);
    setForceGroupCheck(false);
    setForceGroupUncheck(false);

    if(needResetData)
      setIsFirstEntry(true);
  };

  const callback = (result) => {
    setIsFirstEntry(false);
    setLoading(false);

    if(!result.succeed)
      return;

    setKtbs(result.result);
    setSearchedKtbs(result.result);
  }

  const errorHandler = (error) => {
    setLoading(false);
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
      return data.ktb.name.toLowerCase().search(searchKey.toLowerCase()) > -1;
    };

    setSearchedKtbs(ktbs.filter(filterKtbs));
  }

  const onGroupClick = (id) => {
    setLoading(true);
    const selectedKtbsTmp = searchedKtbs.filter((data) => {return data.ktb.id === id});
    setLoading(false);

    if(selectedKtbsTmp.length === 0)
      return;

    const selectedKtb = selectedKtbsTmp[0];

    props.dispatch({type: SET_SELECTED_KTB, ktb: selectedKtb});
    navigation.replace('ViewDataKTBScreen');
  }

  const onGroupChecked = (id, checked) => {
    let selectedKtbsTemp = [];

    selectedKtbs.forEach((item) => {
      selectedKtbsTemp.push(item);
    })

    if(!selectedKtbs.find((idx) => idx === id) && checked)
      selectedKtbsTemp.push(id);
    else if(selectedKtbs.find((idx) => idx === id) && !checked)
      selectedKtbsTemp = selectedKtbsTemp.filter((idx) => idx !== id);
    
    const isAllKtbSelected = selectedKtbsTemp.length === searchedKtbs.length;
    setForceGroupCheck(isAllKtbSelected);
    setForceGroupUncheck(false);
    setSelectAllText(isAllKtbSelected ? unselectAll : selectAll);
    setSelectedKtbs(selectedKtbsTemp);
  }

  const onMemberClick = (id) => {
    console.log(`test member ${id}`);
    resetState();
  }

  const onGroupLongPress = () => {
    setCheckedMode(true);
  };

  const addGroup = () => {
    console.log("add group");
  };

  const deleteGroup = () => {
    console.log('delete group');
  };

  if(isFirstEntry)
    getktbapi.getktbsbypktbid(props.User.member_id, callback, errorHandler);

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
    headerStyle,
    headerCancelStyle,
    headerCancelTextStyle,
    headerSelectAllStyle,
    headerSelectAllTextStyle,
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
      comps.push(
        <DiscipleshipGroup
          group={element.ktb}
          members={element.members}
          colorHolder={groupColors[idx]}
          key={idx}
          navigation={navigation}
          onGroupLongPress={onGroupLongPress}
          onGroupClick={onGroupClick}
          onGroupChecked={onGroupChecked}
          onMemberClick={onMemberClick}
          isCheckedMode={checkedMode}
          forceGroupCheck={forceGroupCheck}
          forceGroupUncheck={forceGroupUncheck}
        />
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

  const additionalHeader = (
    <KeyboardAvoidingView style={[searchSectionStyle, searchContainerStyle]}
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
  );

  const child = (
    <KeyboardAvoidingView style={bodyContainerStyle}>
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
    </KeyboardAvoidingView>
  );

  const footer = (
    <View style={searchSectionStyle}>
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
          disabled={selectedKtbs.length === 0}
        >
          <Icon name="delete" size={ProportionateScreenSizeValue(25)} color="white"></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );

  const onCancelClick = () => {
    resetState(false);
  }

  const onSelectAllClick = (text) => {
    let forceGroupCheckTmp = false;
    
    if(text === selectAll)
      forceGroupCheckTmp = true;
    
    setForceGroupCheck(forceGroupCheckTmp);
    setForceGroupUncheck(!forceGroupCheckTmp);

    if(!forceGroupCheckTmp)
      setSelectedKtbs([]);

    setSelectAllText(forceGroupCheckTmp ? unselectAll : selectAll);
  }

  const customHeader = (
    <View
      style={headerStyle}
    >
      <TouchableOpacity
        style={headerCancelStyle}
        activeOpacity={0.5}
        onPress={() => onCancelClick()}
      >
        <Text
          style={headerCancelTextStyle}
        >
          Cancel
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={headerSelectAllStyle}
        activeOpacity={0.5}
        onPress={() => onSelectAllClick(selectAllText)}
      >
        <Text
          style={headerSelectAllTextStyle}
        >
          {selectAllText}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <BodyMenuBaseScreen
      title="KTB"
      customHeader={
        (checkedMode) ? customHeader : undefined
      }
      additionalHeader={additionalHeader}
      child={child}
      footer={footer}
    />
  );
};

const mapStateToProps = state => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps)(ViewALLKTBScreen);