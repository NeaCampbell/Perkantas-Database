/* eslint-disable prettier/prettier */
import { URL, PORT, DELETE, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const deletektbsbylistid = (listid, usr, callback, errorHandler) => {
  let listIdStr = '';

  listid.forEach(item => {
    listIdStr += `${(listIdStr === '' ? '' : '&')}listid=${item}`;
  });

  const options = {
    hostname: URL,
    port: PORT,
    path: `/ktb/deletektbsbylistid?${listIdStr}`,
    method: DELETE,
    headers: {
      'Token': TOKEN,
      'Username': usr,
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
