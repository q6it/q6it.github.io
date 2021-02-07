// import logo from './logo.svg';
// import Table from './components/Table';
import { Grid } from 'semantic-ui-react';

import Ticker from './components/Ticker';
import Sidebar from './components/Sidebar/Sidebar';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App">
      <Grid columns={3}>
        <Grid.Column>
          <Sidebar />
        </Grid.Column>
        <Grid.Row>
          <Grid.Column></Grid.Column>
          <Grid.Column>
            <Ticker />
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default App;
