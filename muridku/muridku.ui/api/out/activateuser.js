const http = require('follow-redirects').http;
const apiconst = require('../apiconst');

const activateuser = (email) => {
  const options = {
    hostname: apiconst.URL,
    port: apiconst.PORT,
    path: `/user/activateuser?email=${email}`,
    method: apiconst.PUT,
    headers: {
      'Token': apiconst.TOKEN
    }
  };

  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  const req = http.request(options, res => {
    console.log("activateuser");
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

  req.end();
};

module.exports = {
  activateuser: activateuser
};