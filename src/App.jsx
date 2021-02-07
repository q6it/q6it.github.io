import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

import Ticker from './components/Ticker';
import Sidebar from './components/Sidebar/Sidebar';

// import logo from './logo.svg';
// import Table from './components/Table';
import './App.scss';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App">
      <Grid>
        <Grid.Column mobile={16} tablet={8} computer={4}>
          <Sidebar width={200} height="100vh">
            <h1>item 1</h1>
            <h1>item 2</h1>
            <h1>item 3</h1>
          </Sidebar>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={5}>
          <Grid.Row>
            <h1>Create order</h1>
          </Grid.Row>
          <Grid.Row>
            <Ticker />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column mobile={16} tablet={8} computer={5}>
          <Grid.Row>
            <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
