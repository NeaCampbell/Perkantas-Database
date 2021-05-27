/* eslint-disable prettier/prettier */
/* eslint-disable curly */
/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import { registerRootComponent } from 'expo';
import App from './App';
import {name as appName} from './app.json';

if (Platform.OS !== 'web')
  AppRegistry.registerComponent(appName, () => App);
else
  registerRootComponent(App);
