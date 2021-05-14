import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const getktbsbypktbid = (memberid, callback) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/ktb/getktbsbypktbid?memberid=${memberid}`,
    method: GET,
    headers: {
      'Token': TOKEN
    }
  };

  requesttemplate(options, callback, null, IS_HTTP);
};