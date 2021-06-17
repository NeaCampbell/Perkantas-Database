/* eslint-disable prettier/prettier */
/* eslint-disable curly */
const appJson = require('../app.json');

export const requesttemplate = (options, callback, paraminput, ishttp, errorHandler) => {
  let url = `${options.hostname}:${options.port}${options.path}`;

  if (ishttp === false)
    url = `https://${url}`;
  else
    url = `http://${url}`;

  options.headers.Version = appJson.version;

  fetch(url, {
    method: options.method,
    headers: options.headers,
    body: paraminput,
  })
  .then((response) => response.json())
  .then((json) => {
    // console.log(json);

    if (callback !== undefined && callback !== null)
      callback(json);
  })
  .catch((error) => {
    console.error(url);
    console.error(options);
    console.error(paraminput ?? 'no param input');
    console.error(error);

    if (errorHandler !== undefined && errorHandler !== null)
      errorHandler(error);
  });
};
