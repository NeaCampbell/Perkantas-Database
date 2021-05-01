import {
  BasicColor,
  BasicStyles,
  LoadingViewSize,
  ContainerImageCoverColor,
  InputWrapperColor,
  PlaceholderTextColor } from '../../asset/style-template/BasicStyles';
import { SplashStyles } from '../../asset/style-template/SplashStyles';
import { LoginStyles } from '../../asset/style-template/LoginStyles';
import { UserStyles } from '../../asset/style-template/UserStyles';

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