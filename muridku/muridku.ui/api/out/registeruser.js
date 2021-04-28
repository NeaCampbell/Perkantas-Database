const apiconst = require('../apiconst');
const template = require('./requesttemplate');

const registeruser = (fullname, address, email, password) => {
  const paraminput = JSON.stringify({
    fullname: fullname,
    address: address,
    email: email,
    password: password
  });

  const options = {
    hostname: apiconst.URL,
    port: apiconst.PORT,
    path: '/user/registermuridkuuser',
    method: apiconst.POST,
    headers: {
      'Token': apiconst.TOKEN,
      'Content-Type': 'application/json'
    }
  };

  template.requesttemplate(options, null, paraminput);
};

module.exports = {
  registeruser: registeruser
};