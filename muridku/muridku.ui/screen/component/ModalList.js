/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import React, { useState } from 'react';
import { Keyboard, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  StyleSheet,
} from 'react-native';
import Checkbox from './Checkbox';
import SearchToggle from './SearchToggle';

const opacity = 0.5;

const ModalList = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchedList, setSearchedList] = useState(props.list);
  const [selectedId, setSelectedId] = useState(props.selectedId);
  const [selectedName, setSelectedName] = useState(props.selectedName);

  const onSearchClick = () => {
    if (!searchText || searchText === '') {
      setSearchedList(props.list);
    }

    const filterFunc = (data) => {
      return data.name.toLowerCase().search(searchText.toLowerCase()) > -1;
    };

    setSearchedList(props.list.filter(filterFunc));
  };

  const onItemClick = (id, name) => {
    setSelectedId(id);
    setSelectedName(name);
  };

  const onSelectClick = (id, name) => {
    if (!id)
      return;

    if (props.onSelectClick)
      props.onSelectClick(id, name);
  };

  const onCancelClick = () => {
    if (props.onCancelClick)
      props.onCancelClick();
  };

  const list = [];

  searchedList.forEach(item => {
    list.push(
      <TouchableOpacity
        key={item.id}
        style={props.listItemSectionStyle}
        onPress={() => onItemClick(item.id, item.name)}
      >
        <View style={props.listItemTextSectionStyle}>
          <Text style={props.listItemTextStyle} numberOfLines={1}>{item.name}</Text>
        </View>
        <Checkbox
          checked={item.id === selectedId}
          disabled={true}
        />
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.bodyContainerStyle}>
      <View style={props.mainSectionStyle}>
        <View style={props.searchSectionStyle}>
          <SearchToggle
            containerStyle={props.searchSectionContainerStyle}
            inputStyle={props.searchInputStyle}
            buttonStyle={props.searchButtonStyle}
            buttonTextStyle={props.searchButtonTextStyle}
            placeholder={props.searchPlaceholder}
            placeholderTextColor={props.searchPlaceholderTextColor}
            keyboardType="default"
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            underlineColorAndroid="#f000"
            returnKeyType="next"
            iconSize={props.searchIconSize}
            value={searchText}
            onChangeText={setSearchText}
            onSearchSubmit={() => onSearchClick()}
          />
        </View>
        <ScrollView
          style={props.listSectionStyle}
          contentContainerStyle={styles.listSectionContentStyle}
        >
          {list}
        </ScrollView>
        <View style={props.buttonSectionStyle}>
          <TouchableOpacity
            style={[props.buttonStyle, !selectedId || selectedId === 0 ? styles.buttonDisableStyle : null]}
            onPress={() => onSelectClick(selectedId, selectedName)}
            disabled={!selectedId || selectedId === 0}
            activeOpacity={opacity}
          >
            <View style={props.selectButtonStyle}>
              <Text style={props.selectTextStyle} numberOfLines={1}>SELECT</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={props.buttonStyle}
            onPress={() => onCancelClick()}
            activeOpacity={opacity}
          >
            <View style={props.cancelButtonStyle}>
              <Text style={props.cancelTextStyle} numberOfLines={1}>CANCEL</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContainerStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  listSectionContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisableStyle: {
    opacity: opacity,
  },
});

export default ModalList;
