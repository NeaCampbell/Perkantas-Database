/* eslint-disable prettier/prettier */
import { URL, PORT, PUT, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const activateuser = (email, callback) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/user/activateuser?email=${email}`,
    method: PUT,
    headers: {
      'Token': TOKEN,
    },
  };

  requesttemplate(options, callback, null, IS_HTTP);
};
