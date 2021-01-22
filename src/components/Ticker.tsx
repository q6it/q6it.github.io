import React, { useState, useEffect } from 'react';
import { Input, Button } from 'semantic-ui-react';
import request from '../api';

// type Props  {
//   prop: ''
// }

function Ticker() {
  const [symbol, setSymbol] = useState('');
  console.log('🚀 ~ file: Ticker.jsx ~ line 6 ~ Ticker ~ symbol', symbol);

  const [btcTicker, setBtcPrice] = useState({});
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
    const response = await request('POST', 'http://127.0.0.1:5000/ticker', {symbol})
    console.log('🚀 ~ file: Ticker.jsx ~ line 22 ~ getPrice ~ response', response);
    // const responseData = await response.json();
    // console.log('🚀 ~ file: Ticker.jsx ~ line 15 ~ responseData', responseData);
    setBtcPrice(response.data.response);
  };

  return (
    <div>
      <p>{btcTicker.symbol}</p>
      <p>{btcTicker.price}</p>
      <Input
        placeholder="Insert symbol"
        onChange={(e) => {
          console.log('🚀 ~ file: Ticker.jsx ~ line 27 ~ Ticker ~ e', e);
          const value = e.target.value.toUpperCase();
          setSymbol(value);
        }}
      />
      <Button onClick={() => {
        getPrice()
      }}>Get price</Button>
    </div>
  );
}

export default Ticker;
