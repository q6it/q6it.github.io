import React from 'react';

import { Order } from './containers/Order/Order';
import Sidebar from './components/Sidebar/Sidebar';

import './App.scss';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Order />
    </div>
  );
}

export default App;
