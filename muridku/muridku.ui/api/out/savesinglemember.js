/* eslint-disable prettier/prettier */
import { URL, PORT, POST, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const savesinglemember = (ktb_id, email, name, address, birth_dt, birth_place, mobile_phn, institution_id, faculty_id, usr, callback, errorHandler) => {
  const paraminput = JSON.stringify({
    ktb_id: ktb_id,
    email: email === '' ? null : email,
    name: name === '' ? null : name,
    address: address === '' ? null : address,
    birth_dt: birth_dt === '' ? null : birth_dt,
    birth_place: birth_place === '' ? null : birth_place,
    mobile_phn: mobile_phn === '' ? null : mobile_phn,
    institution_id: institution_id === '' ? null : institution_id,
    faculty_id: faculty_id === '' ? null : faculty_id,
  });

  const options = {
    hostname: URL,
    port: PORT,
    path: '/member/savesinglemember',
    method: POST,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
      'Username': usr,
    },
  };

  requesttemplate(options, callback, paraminput, IS_HTTP, errorHandler);
};
