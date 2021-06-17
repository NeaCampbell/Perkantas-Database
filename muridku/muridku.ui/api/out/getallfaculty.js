/* eslint-disable prettier/prettier */
import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const getallfaculty = (usr, callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: '/faculty/getallfaculty',
    method: GET,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
      'Username': usr,
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
