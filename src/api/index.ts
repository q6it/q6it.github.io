// import { PathLike } from 'fs';

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

interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}
type AxiosPromise<TData = any> = Promise<AxiosResponse<TData>>;
interface DataInterface {
  symbol: string;
  priceStep: number;
  sizeStep: number;
  price: string;
  limit: number;
}
interface Response {
  data: {
    response: any;
  };
}

export const requests = {
  ticker(symbol: string): Promise<AxiosPromise> {
    return requestInstance.post('/ticker', { symbol });
  },
  orders(data: DataInterface): Promise<AxiosPromise> {
    console.log('🚀 ~ file: index.ts ~ line 44 ~ orders ~ data', data);
    return requestInstance.post('/orders', { data });
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
