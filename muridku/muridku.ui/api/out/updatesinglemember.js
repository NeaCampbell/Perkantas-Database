/* eslint-disable prettier/prettier */
import { URL, PORT, PUT, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const updatesinglemember = (email, id, fullname, address, birth_dt, birth_place, mobile_phn, institution_id, faculty_id, usr, callback, errorHandler) => {
  const paraminput = JSON.stringify({
    id: id,
    email: email === '' ? null : email,
    name: fullname === '' ? null : fullname,
    address: address === '' ? null : address,
    birth_dt: birth_dt === '' ? null : birth_dt,
    birth_place: birth_place === '' ? null : birth_place,
    mobile_phn: mobile_phn === '' ? null : mobile_phn,
    institution_id: institution_id === 0 ? null : institution_id,
    faculty_id: faculty_id === 0 ? null : faculty_id,
  });

  const options = {
    hostname: URL,
    port: PORT,
    path: '/member/updatesinglemember',
    method: PUT,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
      'Username': usr,
    },
  };

  requesttemplate(options, callback, paraminput, IS_HTTP, errorHandler);
};
