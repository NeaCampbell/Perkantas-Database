/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import {
    Dimensions,
  } from 'react-native';

export const CommonMessages = {
  DATA_NOT_FOUND: 'data not found!',
};

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

export const DateToStringApi = (date) => {
  if (!date)
    return '';

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};

export const DateToString = (date) => {
  if (!date)
    return '';

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();

  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
};

const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];


export const DateToStringWithMonthAsString = (date) => {
  if (!date)
    return '';

  const year = date.getFullYear().toString();
  const month = months[date.getMonth()];
  const dayNum = date.getDate().toString();

  return `${dayNum < 10 ? '0' + dayNum : dayNum} ${month} ${year}`;
};

export const DateToStringWithDay = (date) => {
  if (!date)
    return '';

  const year = date.getFullYear().toString();
  const month = months[date.getMonth()];
  const dayNum = date.getDate().toString();
  const dayStr = days[date.getDay()];

  return `${dayStr}, ${dayNum < 10 ? '0' + dayNum : dayNum} ${month} ${year}`;
};

export const GetFirstWord = (value) => {
  if (!value || value === '')
    return '';

  return value.split(' ')[0];
};

export const ListToString = (list, onlyFirstWord = true) => {
  if (!list || list.length === 0)
    return '';

  let result = '';

  list.forEach(item => {
    if (result !== '')
      result += ', ';

    result += onlyFirstWord ? GetFirstWord(item.value) : item.value;
  });

  return result;
};
