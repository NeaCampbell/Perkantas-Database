const apiconst = require('../apiconst');
const template = require('./requesttemplate');

const login = (email, password, callback) => {
  const options = {
    hostname: apiconst.URL,
    port: apiconst.PORT,
    path: `/user/login?email=${email}&password=${password}`,
    method: apiconst.PUT,
    headers: {
      'Token': apiconst.TOKEN
    }
  };
  
  template.requesttemplate(options, callback);
};

module.exports = {
  login: login
};