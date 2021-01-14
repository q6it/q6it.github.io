import axios from 'axios';

const request = (requestMethod, url, data) => {
  console.log('🚀 ~ file: index.js ~ line 4 ~ request ~ data', data);
  const options = {
    method: requestMethod,
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    url,
    data,
  };
  return axios(options);
};

export default request;
