import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Text,
  Image,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import BodyMenuBaseScreen from './BodyMenuBaseScreen';
import SearchToggle from './component/SearchToggle';
import DiscipleshipGroup from './component/DiscipleshipGroup';
import { BasicStyles, BasicColor, PlaceholderTextColor } from '../asset/style-template/BasicStyles';
import { DataAKKStyles } from '../asset/style-template/DataAKKStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ProportionateScreenSizeValue
} from '../helper/CommonHelper';

const getktbapi = require('../api/out/getktbsbypktbid');

const CreateDataAKKScreen = (props) => {
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const [ktbs, setKtbs] = useState([]);
  const [searchedKtbs, setSearchedKtbs] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchPressed, setSearchPressed] = useState(false);
  const [checkedMode, setCheckedMode] = useState(false);
  const [selectedKtbs, setSelectedKtbs] = useState([]);
  console.log(selectedKtbs);
  
  const resetState = () => {
    setLoading(true);
    setKtbs([]);
    setSearchedKtbs([]);
    setSearchKey("");
    setSearchPressed(false);
    setCheckedMode(false);
  };

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

  const onGroupChecked = (id, checked) => {
    console.log(`test check ${id}`);
    let selectedKtbsTemp = [];

    selectedKtbs.forEach((item) => {
      selectedKtbsTemp.push(item);
    })

    if(!selectedKtbs.find((idx) => idx === id) && checked)
      selectedKtbsTemp.push(id);
    else if(selectedKtbs.find((idx) => idx === id) && !checked)
      selectedKtbsTemp = selectedKtbsTemp.filter((idx) => idx !== id);

    setSelectedKtbs(selectedKtbsTemp);
  }

  const onMemberClick = (id) => {
    console.log(`test member ${id}`);
    resetState();
  }

  const onGroupLongPress = () => {
    console.log("test long press");
    setCheckedMode(true);
  };

  const addGroup = () => {
    console.log("add group");
  };

  const deleteGroup = () => {
    console.log('delete group');
  };

  if(loading)
    getktbapi.getktbsbypktbid(props.User.member_id, callback);

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

  const { globalFontStyle, basicInputStyle, inputStyle } = BasicStyles;
  
  const {
    bodyContainerStyle,
    searchSectionStyle,
    searchContainerStyle,
    searchTextStyle,
    footerButtonStyle,
    buttonStyle,
    customActivityIndicatorStyle,
    bodySectionStyle,
    nameButtonTextStyle,
    cityButtonTextStyle,
    photoStyle,
    buttonFooterStyle,
    welcomingTextStyle,
    accTypeTextStyle,
    welcomingTextSectionStyle,
    descTextStyle,
    submitButtonTextStyle,
    formStyle,
    formSectionStyle
  } = DataAKKStyles;

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

  const child = (
    <View style={bodyContainerStyle}>
      <View style={welcomingTextSectionStyle}>
        <Text style={[globalFontStyle, welcomingTextStyle]}>
          Welcome
        </Text>
        <Text style={[globalFontStyle, accTypeTextStyle]}>
          Choose your Account Type
        </Text>
      </View>
      <View style={searchSectionStyle}>
          <View style={{flexDirection: 'row', flex: 7}}>
            <View style={[bodySectionStyle, {flex: 2.5}]}>
              <TouchableOpacity
                style={buttonStyle}
                activeOpacity={0.5}
                >
                <Image
                  source={require('../asset/img/man.png')}
                  style={photoStyle}
                />
                <Text style={[globalFontStyle, nameButtonTextStyle]}>
                  Mahasiswa
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[bodySectionStyle, {flex: 2.5}]}>
              <TouchableOpacity
                style={buttonStyle}
                activeOpacity={0.5}
                >
                <Image
                  source={require('../asset/img/man.png')}
                  style={photoStyle}
                />
                <Text style={[globalFontStyle, nameButtonTextStyle]}>
                  Siswa
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
      <View style={welcomingTextSectionStyle}>
        <Text style={[globalFontStyle, descTextStyle]}>
          Hello! Please fill out the form below to get started
        </Text>
      </View>
      <View style={formSectionStyle}>
      <KeyboardAvoidingView
        style={[bodySectionStyle, {marginTop: ProportionateScreenSizeValue(15)}]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput style={[globalFontStyle, inputStyle, formStyle]}
          placeholder="Nama AKK"
          placeholderTextColor={PlaceholderTextColor}
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={[bodySectionStyle, {marginTop: ProportionateScreenSizeValue(5)}]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput style={[globalFontStyle, inputStyle, formStyle]}
          placeholder="Email"
          placeholderTextColor={PlaceholderTextColor}
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={[bodySectionStyle, {marginTop: ProportionateScreenSizeValue(5)}]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput style={[globalFontStyle, inputStyle, formStyle]}
          placeholder="Alamat"
          placeholderTextColor={PlaceholderTextColor}
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={[bodySectionStyle, {marginTop: ProportionateScreenSizeValue(5)}]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput style={[globalFontStyle, inputStyle, formStyle]}
          placeholder="No. Handphone"
          placeholderTextColor={PlaceholderTextColor}
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={[bodySectionStyle, {marginTop: ProportionateScreenSizeValue(5)}]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput style={[globalFontStyle, inputStyle, formStyle]}
          placeholder="Tanggal Lahir"
          placeholderTextColor={PlaceholderTextColor}
        />
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        style={[bodySectionStyle, {marginTop: ProportionateScreenSizeValue(5)}]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput style={[globalFontStyle, inputStyle, formStyle]}
          placeholder="Universitas/Sekolah"
          placeholderTextColor={PlaceholderTextColor}
        />
      </KeyboardAvoidingView>
      </View>
      <ScrollView>
        <View style={[{flexDirection: 'column', flex: 1}]}>
          {groups}
        </View>
      </ScrollView>
      {
      // (loading) ? 
      //   (<View style={customActivityIndicatorStyle}>
      //     <ActivityIndicator
      //       animating={loading}
      //       color={BasicColor}
      //       size={ProportionateScreenSizeValue(ProportionateScreenSizeValue(30))}
      //     />
      //   </View>) : null
      }
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
          <Text style={[globalFontStyle, submitButtonTextStyle]}>Create</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <BodyMenuBaseScreen title="Create Data AKK" child={child} footer={footer} />
  );
};

const mapStateToProps = state => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps)(CreateDataAKKScreen);