/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import {
    Dimensions,
  } from 'react-native';

export const WindowSize = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  defaultHeight: 568,
  maxWidth: 1366,
  maxHeight: 1366,
};

export const ProportionateScreenSizePercentage = (percentage) => {
  const result = percentage / 100 * WindowSize.width;
  return result > WindowSize.maxWidth ? WindowSize.maxWidth : result;
};

export const ProportionateScreenSizeValue = (compHeight) => {
  const result = compHeight * WindowSize.height / WindowSize.defaultHeight;
  return result > WindowSize.maxHeight ? WindowSize.maxHeight : result;
};

export const ChangeColorFunction = (oldColors) => {
  const getRandomNo = () => {
    let res = Math.random();
    const minValue = 0.4;
    const maxValue = 0.7;

    while (res < minValue || res > maxValue)
      res = Math.random();

    return res;
  };

  const colorTolerance = 5;
  let r = Math.floor(getRandomNo() * 255);
  let g = Math.floor(getRandomNo() * 255);

  while (g >= r - colorTolerance && g <= r + colorTolerance)
    g = Math.floor(getRandomNo() * 255);

  let b = Math.floor(getRandomNo() * 255);

  while ((b >= r - colorTolerance && b <= r + colorTolerance) || (b >= g - colorTolerance && b <= g + colorTolerance))
    b = Math.floor(getRandomNo() * 255);

  const result = `rgb(${r},${g},${b})`;

  if (oldColors.find((col) => col === result))
    return ChangeColorFunction(oldColors);

  return result;
};
