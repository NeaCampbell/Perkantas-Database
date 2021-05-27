/* eslint-disable prettier/prettier */
import { URL, PORT, POST, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const saveuser = (email, callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/user/validatenewemail?email=${email}`,
    method: POST,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
