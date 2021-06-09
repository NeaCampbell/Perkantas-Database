/* eslint-disable prettier/prettier */
import { URL, PORT, PUT, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const activateuser = (emaillist, usr, callback, errorHandler) => {
  const emailArr = [];

  emaillist.forEach(item => {
    emailArr.push({
      id: item.id,
      email: item.email,
      is_active: item.is_active,
    });
  });

  const paraminput = JSON.stringify(emailArr);

  const options = {
    hostname: URL,
    port: PORT,
    path: '/user/activateuser',
    method: PUT,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json; charset=utf-8;',
      'Username': usr,
    },
  };

  requesttemplate(options, callback, paraminput, IS_HTTP, errorHandler);
};
