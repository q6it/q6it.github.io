import axios from 'axios';

const baseUrl = 'https://api2.binance.com';

export const getExchangeInfo = async <T>(): Promise<T> => {
  const { data } = await axios.get(`${baseUrl}/api/v3/exchangeInfo`);
  return data.symbols;
};
