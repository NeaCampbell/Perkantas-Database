const apiconst = require('../apiconst');
const template = require('./requesttemplate');

const checkuserloginstatus = (email, callback) => {
  const options = {
    hostname: apiconst.URL,
    port: apiconst.PORT,
    path: `/user/checkuserloginstatus?email=${email}`,
    method: apiconst.GET,
    headers: {
      'Token': apiconst.TOKEN
    }
  };

  template.requesttemplate(options, callback);
};

module.exports = {
  checkuserloginstatus: checkuserloginstatus
};