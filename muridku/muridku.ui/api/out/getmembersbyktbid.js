/* eslint-disable prettier/prettier */
import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const getmembersbyktbid = (ktbid, callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/member/getmembersbyktbid?ktbid=${ktbid}`,
    method: GET,
    headers: {
      'Token': TOKEN,
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
