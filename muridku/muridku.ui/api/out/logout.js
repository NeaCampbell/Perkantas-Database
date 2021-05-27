/* eslint-disable prettier/prettier */
import { URL, PORT, PUT, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const logout = (email, callback) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/user/logout?email=${email}`,
    method: PUT,
    headers: {
      'Token': TOKEN,
    },
  };

  requesttemplate(options, callback, null, IS_HTTP);
};
