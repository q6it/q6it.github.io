import React, { useState, useEffect } from 'react';
import { Grid, Input, Button } from 'semantic-ui-react';

import { request } from '../api/index';

// type Props  {
//   prop: ''
// }

const Ticker: React.FC = () => {
  const [symbol, setSymbol] = useState('');
  console.log('🚀 ~ file: Ticker.jsx ~ line 6 ~ Ticker ~ symbol', symbol);

  const [btcTicker, setBtcPrice] = useState({ symbol: '', price: '' });
  // useEffect(() => {
  //   (async () => {
  //     // response.json().then((suka) => {
  //     //   console.log('🚀 ~ file: Ticker.jsx ~ line 14 ~ test.then ~ suka', suka);
  //     // });
  //     // console.log('🚀 ~ file: Ticker.jsx ~ line 6 ~ test', test);
  //   })();
  // }, []);

  const getPrice = async () => {
    // const response = await fetch('http://127.0.0.1:5000/ticker');
    // const response = await request('POST', 'http://127.0.0.1:5000/ticker', {symbol})
    const response = await request.ticker(symbol);
    console.log('🚀 ~ file: Ticker.tsx ~ line 28 ~ getPrice ~ response', response);
    console.log('🚀 ~ file: Ticker.jsx ~ line 22 ~ getPrice ~ response', response.data);
    // const responseData = await response.json();
    // // console.log('🚀 ~ file: Ticker.jsx ~ line 15 ~ responseData', responseData);
    setBtcPrice(response.data.response);
  };
  const inputRef = React.useRef<Input>(null);

  return (
    <div>
      <p>{btcTicker.symbol}</p>
      <p>{btcTicker.price}</p>
      <Input
        placeholder="Insert symbol"
        ref={inputRef}
        onChange={(e) => {
          const value = e.target.value.toUpperCase();
          setSymbol(value);
        }}
      />

      <Button
        onClick={() => {
          getPrice();
        }}
      >
        Get price
      </Button>
      <Button
        onClick={() => {
          getPrice();
        }}
      >
        test
      </Button>
    </div>
  );
};

export default Ticker;
