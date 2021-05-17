import {
    Dimensions
  } from 'react-native';

export const WindowSize = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  defaultHeight: 568,
  maxWidth: 1366,
  maxHeight: 1366,
}

export const ProportionateScreenSizePercentage = (percentage) => {
  const result = percentage / 100 * WindowSize.width;
  return result > WindowSize.maxWidth ? WindowSize.maxWidth : result;
}

export const ProportionateScreenSizeValue = (compHeight) => {
  const result = compHeight * WindowSize.height / WindowSize.defaultHeight;
  return result > WindowSize.maxHeight ? WindowSize.maxHeight : result;
}