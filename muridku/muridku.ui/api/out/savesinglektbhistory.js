/* eslint-disable prettier/prettier */
import { URL, PORT, POST, TOKEN, IS_HTTP } from '../apiconst';
import { requesttemplate } from './requesttemplate';

export const savesinglektbhistory = (ktb_id, meet_dt, material_id, material_name, material_chapter, members, usr, callback, errorHandler) => {
  const paraminput = JSON.stringify({
    ktb_id: ktb_id,
    meet_dt: meet_dt,
    material_id: material_id,
    material_name: material_name,
    material_chapter: material_chapter,
    members: members,
  });

  const options = {
    hostname: URL,
    port: PORT,
    path: '/ktb/savesinglektbhistory',
    method: POST,
    headers: {
      'Token': TOKEN,
      'Content-Type': 'application/json',
      'Username': usr,
    },
  };

  requesttemplate(options, callback, paraminput, IS_HTTP, errorHandler);
};
