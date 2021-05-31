/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import { Platform } from 'react-native';
import { URL, PORT, PUT, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';
import publicIP from 'react-native-public-ip';
import { getUniqueId } from 'react-native-device-info';

export const login = (email, password, isstayloggedin, callback, errorHandler) => {
  publicIP().then((ip) => {
    let unique_id = ip;

    if (Platform.OS !== 'web')
      unique_id = getUniqueId();

    const options = {
      hostname: URL,
      port: PORT,
      path: `/user/login?email=${email}&password=${password}&deviceid=${unique_id}&isstayloggedin=${isstayloggedin}`,
      method: PUT,
      headers: {
        'Token': TOKEN,
      },
    };

    requesttemplate(options, callback, null, IS_HTTP, errorHandler);
  });
};
