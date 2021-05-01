const apiconst = require('../apiconst');
const template = require('./requesttemplate');

const activateuser = (email, callback) => {
  const options = {
    hostname: apiconst.URL,
    port: apiconst.PORT,
    path: `/user/activateuser?email=${email}`,
    method: apiconst.PUT,
    headers: {
      'Token': apiconst.TOKEN
    }
  };

  template.requesttemplate(options, callback);
};

module.exports = {
  activateuser: activateuser
};