const apiconst = require('../apiconst');
const template = require('./requesttemplate');

const logout = (email) => {
  const options = {
    hostname: apiconst.URL,
    port: apiconst.PORT,
    path: `/user/logout?email=${email}`,
    method: apiconst.PUT,
    headers: {
      'Token': apiconst.TOKEN
    }
  };

  template.requesttemplate(options);
};

module.exports = {
  logout: logout
};