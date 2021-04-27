const http = require('follow-redirects').http;
const apiconst = require('../apiconst');

const registeruser = (fullname, address, email, password) => {
  const paraminput = JSON.stringify({
    fullname: fullname,
    address: address,
    email: email,
    password: password
  });

  console.log(paraminput);

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

  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  const req = http.request(options, res => {
    console.log("registeruser");
    console.log(options);
    console.log();
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      let result = JSON.parse(d);
      console.log(result);
      console.log(result.succeed);

      if(result.succeed) {
        console.log("BERHASIL!");
        return;
      }
      
      console.log("GAGAL.....");
    });
  })

  req.on('error', error => {
    console.error(error);
  });

  req.write(paraminput);
  req.end();
};

module.exports = {
  registeruser: registeruser
};