import { URL, PORT, GET, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const checkuserloginstatus = (email, callback) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/user/checkuserloginstatus?email=${email}`,
    method: GET,
    headers: {
      'Token': TOKEN
    }
  };

  requesttemplate(options, callback, null, IS_HTTP);
};