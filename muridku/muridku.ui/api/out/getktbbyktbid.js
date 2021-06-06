/* eslint-disable prettier/prettier */
import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const getktbbyktbid = (ktbid, usr, callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/ktb/getktbbyktbid?id=${ktbid}`,
    method: GET,
    headers: {
      'Token': TOKEN,
      'Username': usr,
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
