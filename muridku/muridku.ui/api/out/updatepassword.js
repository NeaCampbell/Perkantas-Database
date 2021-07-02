/* eslint-disable prettier/prettier */
import { URL, PORT, PUT, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const updatepassword = (userid, password, callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/user/updatepassword?userid=${userid}&password=${password}`,
    method: PUT,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
