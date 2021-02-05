import axios from 'axios';
import { log } from 'console';

type requestArgs = {
  requestMethod: 'string'
  url: 'string'
  data: any
}

const requestInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',

  }
})

export const request = {
  ticker(symbol: string) {
    console.log('%c Log:', 'background: #2C2C2C; color: #18C828;', 'test');
    return requestInstance.post('/ticker', { symbol })
  }
}



// const request = (requestMethod: string, url: string, data: any) => {
//   console.log('🚀 ~ file: index.js ~ line 4 ~ request ~ data', data);
//   const options = {
//     method: 'POST',
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
