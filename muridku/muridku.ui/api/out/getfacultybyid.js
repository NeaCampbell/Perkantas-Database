/* eslint-disable prettier/prettier */
import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const getfacultybyid = (faculty_id, callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/faculty/getfacultybyid?id=${faculty_id}`,
    method: GET,
    headers: {
      'Token': TOKEN,
    },
  };

  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};
