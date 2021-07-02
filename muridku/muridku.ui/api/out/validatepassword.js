/* eslint-disable prettier/prettier */
import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const validatepassword = (userid, password, callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/user/validatepassword?userid=${userid}&password=${password}`,
    method: GET,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
