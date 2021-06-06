/* eslint-disable prettier/prettier */
import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const getinstitutionbytype = (inst_type, usr, callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/institution/getinstitutionbytype?insttype=${inst_type}`,
    method: GET,
    headers: {
      'Token': TOKEN,
      'Username': usr,
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
