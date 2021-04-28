const http = require('http');

const requesttemplate = (options, callback, paraminput) => {
  const req = http.request(options, res => {
    console.log(options);
    console.log();

    res.on('data', data => {
      let result = JSON.parse(data);
      console.log(result);
      console.log();

      if(callback !== undefined && callback !== null)
        callback(result);
    });
  })

  req.on('error', error => {
    console.error(error);
  });

  if(paraminput !== undefined && paraminput !== null)
    req.write(paraminput);

  req.end();
};

module.exports = {
  requesttemplate: requesttemplate
};