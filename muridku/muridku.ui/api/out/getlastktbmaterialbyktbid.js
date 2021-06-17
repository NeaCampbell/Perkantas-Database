/* eslint-disable prettier/prettier */
import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const getlastktbmaterialbyktbid = (ktbid, usr, callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/material/getlastktbmaterialbyktbid?ktbid=${ktbid}`,
    method: GET,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
      'Username': usr,
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
