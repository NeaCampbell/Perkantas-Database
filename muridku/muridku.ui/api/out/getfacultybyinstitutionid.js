/* eslint-disable prettier/prettier */
import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const getfacultybyinstitutionid = (institution_id, usr, callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/faculty/getfacultybyinstitutionid?institutionid=${institution_id}`,
    method: GET,
    headers: {
      'Token': TOKEN,
      'Username': usr,
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
