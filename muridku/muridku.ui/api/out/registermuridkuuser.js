/* eslint-disable prettier/prettier */
import { URL, PORT, POST, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const registermuridkuuser = (fullname, address, email, password, callback) => {
  const paraminput = JSON.stringify({
    fullname: fullname,
    address: address,
    email: email,
    password: password,
  });

  const options = {
    hostname: URL,
    port: PORT,
    path: '/user/registermuridkuuser',
    method: POST,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
    },
  };

  requesttemplate(options, callback, paraminput, IS_HTTP);
};
