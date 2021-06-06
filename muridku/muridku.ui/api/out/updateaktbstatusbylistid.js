/* eslint-disable prettier/prettier */
import { URL, PORT, PUT, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const updateaktbstatusbylistid = (ktb_id, list_id, usr, callback, errorHandler) => {
  const paraminput = JSON.stringify({
    ktb_id: ktb_id,
    list_id: list_id,
  });

  const options = {
    hostname: URL,
    port: PORT,
    path: '/ktb/updateaktbstatusbylistid',
    method: PUT,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
      'Username': usr,
    },
  };

  requesttemplate(options, callback, paraminput, IS_HTTP, errorHandler);
};
