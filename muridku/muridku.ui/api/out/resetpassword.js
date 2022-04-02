/* eslint-disable prettier/prettier */
import { URL, PORT, POST, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const resetpassword = (email, callback) => {
  const paraminput = JSON.stringify({
    destination: email,
  });

  const options = {
    hostname: URL,
    port: PORT,
    path: '/email/reset-password',
    method: POST,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
    },
  };

  requesttemplate(options, callback, paraminput, IS_HTTP);
};
