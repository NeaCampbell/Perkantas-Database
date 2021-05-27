/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  BackHandler,
} from 'react-native';
import { BasicStyles } from '../asset/style-template/BasicStyles';
import { SET_CURRENT_PAGE } from '../reducer/action/ActionConst';

const BodyBaseScreen = (props) => {
  const { mainBodyStyle } = BasicStyles;
  const backgroundColor = props.statusBarColor ?? '#000';
  const { navigation } = props;

  const backAction = () => {
    if (props.childName !== props.Page.RootLockedPage && props.childName !== props.Page.RootUnlockedPage) {
      const currentPage = props.Page.Pages.filter((item) => item.name === props.childName)[0];
      const nextPage = props.Page.Pages.filter((item) => item.id === currentPage.backid)[0];
      props.dispatch({ type: SET_CURRENT_PAGE, page: nextPage.name });
      navigation.replace(nextPage.name);
      return true;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  return (
    <SafeAreaView style={mainBodyStyle}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor} />
      {props.items}
    </SafeAreaView>
  );
};

export default BodyBaseScreen;
