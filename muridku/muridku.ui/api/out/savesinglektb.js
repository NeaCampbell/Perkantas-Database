/* eslint-disable prettier/prettier */
import { URL, PORT, POST, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const savesinglektb = (pktb_id, name, usr, callback, errorHandler) => {
  const paraminput = JSON.stringify({
    pktb_id: pktb_id,
    name: name,
  });

  const options = {
    hostname: URL,
    port: PORT,
    path: '/ktb/savesinglektb',
    method: POST,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
      'Username': usr,
    },
  };

  requesttemplate(options, callback, paraminput, IS_HTTP, errorHandler);
};
