import { URL, PORT, PUT, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const login = (email, password, callback) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/user/login?email=${email}&password=${password}`,
    method: PUT,
    headers: {
      'Token': TOKEN
    }
  };
  
  requesttemplate(options, callback, IS_HTTP);
};