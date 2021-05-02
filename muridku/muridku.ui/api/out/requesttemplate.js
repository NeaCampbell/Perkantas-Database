export const requesttemplate = (options, callback, paraminput, ishttp) => {
  let url = `${options.hostname}:${options.port}${options.path}`;

  if(ishttp === false)
    url = `https://${url}`;
  else
    url = `http://${url}`;

  fetch(url, {
    method: options.method,
    headers: options.headers,
    body: paraminput
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json);

    if(callback !== undefined && callback !== null)
      callback(json);
  })
  .catch((error) => {
    console.error(error);
  })
};