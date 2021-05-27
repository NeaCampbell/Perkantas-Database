/* eslint-disable prettier/prettier */
import { URL, PORT, POST, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const saveuser = (email, password, callback, errorHandler) => {
  const paraminput = JSON.stringify({
    email: email,
    password: password,
  });

  const options = {
    hostname: URL,
    port: PORT,
    path: '/user/saveuser',
    method: POST,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
    },
  };

  requesttemplate(options, callback, paraminput, IS_HTTP, errorHandler);
};
