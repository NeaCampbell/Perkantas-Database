import {
  BasicColor,
  BasicStyles,
  LoadingViewSize,
  ContainerImageCoverColor,
  InputWrapperColor,
  PlaceholderTextColor } from './style-template/BasicStyles';
import { SplashStyles } from './style-template/SplashStyles';
import { LoginStyles } from './style-template/LoginStyles';
import { UserStyles } from './style-template/UserStyles';

const PageStylesReducer = (state = {
  BasicStyles,
  LoginStyles,
  SplashStyles,
  UserStyles,
  BasicColor,
  LoadingViewSize,
  ContainerImageCoverColor,
  InputWrapperColor,
  PlaceholderTextColor
}, action) => {
  switch (action.type) {
    default:
      return state;
  };
};

export default PageStylesReducer;