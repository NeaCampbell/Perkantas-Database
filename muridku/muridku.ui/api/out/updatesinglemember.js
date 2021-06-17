/* eslint-disable prettier/prettier */
import { URL, PORT, PUT, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const updatesinglemember = (email, id, fullname, city_id, address, birth_dt, birth_place, mobile_phn, inst_type, institution_id, faculty_id, usr, callback, errorHandler) => {
  const paraminput = JSON.stringify({
    id: id,
    name: fullname === '' ? null : fullname,
    email: email === '' ? null : email,
    city_id: city_id,
    address: address === '' ? null : address,
    birth_dt: birth_dt === '' ? null : birth_dt,
    birth_place: birth_place === '' ? null : birth_place,
    mobile_phn: mobile_phn === '' ? null : mobile_phn,
    inst_type: inst_type === '' ? null : inst_type,
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
