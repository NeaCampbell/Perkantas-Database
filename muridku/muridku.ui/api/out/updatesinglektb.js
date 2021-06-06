/* eslint-disable prettier/prettier */
import { URL, PORT, PUT, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const updatesinglektb = (ktb_id, pktb_id, name, usr, callback, errorHandler) => {
  const paraminput = JSON.stringify({
    ktb_id: ktb_id,
    pktb_id: pktb_id,
    name: name,
  });

  const options = {
    hostname: URL,
    port: PORT,
    path: '/ktb/updatesinglektb',
    method: PUT,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
      'Username': usr,
    },
  };

  requesttemplate(options, callback, paraminput, IS_HTTP, errorHandler);
};
