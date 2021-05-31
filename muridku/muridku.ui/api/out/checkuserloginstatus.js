/* eslint-disable prettier/prettier */
/* eslint-disable curly */
import { Platform } from 'react-native';
import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';
import publicIP from 'react-native-public-ip';
import { getUniqueId } from 'react-native-device-info';

export const checkuserloginstatus = (email, callback, errorHandler) => {
  publicIP().then((ip) => {
    let unique_id = ip;

    if (Platform.OS !== 'web')
      unique_id = getUniqueId();

    const options = {
      hostname: URL,
      port: PORT,
      path: `/user/checkuserloginstatus?email=${email}&deviceid=${unique_id}`,
      method: GET,
      headers: {
        'Token': TOKEN,
      },
    };

    requesttemplate(options, callback, null, IS_HTTP, errorHandler);
  });
};
