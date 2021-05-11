import { URL, PORT, PUT, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const login = (email, password, callback, errorHandler) => {
  const options = {
    hostname: URL,
    port: PORT,
    path: `/user/login?email=${email}&password=${password}`,
    method: PUT,
    headers: {
      'Token': TOKEN
    }
  };
  
  requesttemplate(options, callback, null, IS_HTTP, errorHandler);
};