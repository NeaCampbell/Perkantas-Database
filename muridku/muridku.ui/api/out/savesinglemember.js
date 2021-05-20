import { URL, PORT, POST, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const savesinglemember = (name, address, birth_dt, mobile_phn, institution_id, faculty_id, callback) => {
  const paraminput = JSON.stringify({
    name: name,
    address: address,
    birth_dt: birth_dt,
    mobile_phn: mobile_phn,
    institution_id: institution_id,
    faculty_id: faculty_id
  });

  const options = {
    hostname: URL,
    port: PORT,
    path: '/member/savesinglemember',
    method: POST,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json'
    }
  };

  requesttemplate(options, callback, paraminput, IS_HTTP);
};