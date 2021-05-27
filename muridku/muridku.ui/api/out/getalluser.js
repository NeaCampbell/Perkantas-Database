/* eslint-disable prettier/prettier */
import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const getalluser = (callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: '/user/getalluser',
    method: GET,
    headers: {
      'Token': TOKEN,
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
