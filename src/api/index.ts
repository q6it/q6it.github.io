import { PathLike } from 'fs';

import axios from 'axios';

type RequestArgs = {
  requestMethod: 'string';
  url: 'string';
  data: any;
};

const requestInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

interface Response {
  data: {
    response: any;
  };
}

export const request = {
  ticker(symbol: string): Promise<Response> {
    return requestInstance.post('/ticker', { symbol });
  },
};

// const request = (
//   requestMethod: string,
//   url: string,
//   data: { symbol: string }
// ): Promise<Response> => {
//   console.log('🚀 ~ file: index.js ~ line 4 ~ request ~ data', data);
//   const options = {
//     method: requestMethod,
//     headers: {
//       'Content-type': 'application/json',
//       'Access-Control-Allow-Origin': '*',
//     },
//     url,
//     data,
//   };
//   return axios(options);
// };

// export default request;
