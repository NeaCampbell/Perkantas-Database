/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  BackHandler,
} from 'react-native';
import { BasicStyles } from '../asset/style-template/BasicStyles';
import { SET_CURRENT_PAGE } from '../reducer/action/ActionConst';
import { connect } from 'react-redux';

export const CallbackAction = (props, pageName) => {
  const currentPages = props.Page.Pages.filter((item) => item.name === pageName);
  if (currentPages.length === 0)
    return true;

  if (pageName !== props.Page.RootLockedPage && pageName !== props.Page.RootUnlockedPage) {
    const currentPage = currentPages[0];
    const nextPage = props.Page.Pages.filter((item) => item.id === currentPage.backid)[0];
    props.dispatch({ type: SET_CURRENT_PAGE, page: nextPage.name });
    props.navigation.replace(nextPage.name);
    return true;
  }
};

const BodyBaseScreen = (props) => {
  const { mainBodyStyle } = BasicStyles;
  const backgroundColor = props.statusBarColor ?? '#000';

  const backAction = () => {
    if (props.onBackClick) {
      props.onBackClick();
      return true;
    }

    return CallbackAction(props, props.childName);
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  return (
    <SafeAreaView style={mainBodyStyle}>
      <StatusBar
        animated={true}
        backgroundColor={backgroundColor}
        hidden={props.statusBarColor ? false : true}
      />
      {props.overlayScreen}
      {props.loadingScreen}
      {props.confirmScreen}
      {props.errorScreen}
      {props.items}
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const { Page } = state;
  return { Page };
};

export default connect(mapStateToProps)(BodyBaseScreen);
