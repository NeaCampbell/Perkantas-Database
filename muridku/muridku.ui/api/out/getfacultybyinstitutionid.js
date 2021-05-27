/* eslint-disable prettier/prettier */
import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const getfacultybyinstitutionid = (institution_id, callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/faculty/getfacultybyinstitutionid?institutionid=${institution_id}`,
    method: GET,
    headers: {
      'Token': TOKEN,
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
