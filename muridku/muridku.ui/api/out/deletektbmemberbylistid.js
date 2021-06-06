/* eslint-disable prettier/prettier */
import { URL, PORT, DELETE, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const deletektbmemberbylistid = (ktb_id, list_id, usr, callback, errorHandler) => {
  const paraminput = JSON.stringify({
    ktb_id: ktb_id,
    list_id: list_id,
  });

  const options = {
    hostname: URL,
    port: PORT,
    path: '/ktb/deletektbmemberbylistid',
    method: DELETE,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
      'Username': usr,
    },
  };

  requesttemplate(options, callback, paraminput, IS_HTTP, errorHandler);
};
