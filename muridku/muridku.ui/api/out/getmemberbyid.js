/* eslint-disable prettier/prettier */
import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const getmemberbyid = (memberid, usr, callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/member/getmemberbyid?memberid=${memberid}`,
    method: GET,
    headers: {
      'Token': TOKEN,
      'Username': usr,
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
