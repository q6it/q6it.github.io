import React, { useState, useEffect } from 'react';

function Ticker() {

  const [btcTicker, setBtcPrice] = useState({})
  useEffect(() => {
    (async () => {
      const response = await fetch('http://127.0.0.1:5000/ticker');
      const responseData = await response.json()
      console.log('🚀 ~ file: Ticker.jsx ~ line 15 ~ responseData', responseData);
      setBtcPrice(responseData.response)
      // response.json().then((suka) => {
      //   console.log('🚀 ~ file: Ticker.jsx ~ line 14 ~ test.then ~ suka', suka);
      // });
      // console.log('🚀 ~ file: Ticker.jsx ~ line 6 ~ test', test);
    })();
  }, []);

  return (
    <div>
      <p>{btcTicker.symbol}</p>
      <p>{btcTicker.price}</p>
    </div>
  );
}

export default Ticker;
