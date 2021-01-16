import React from 'react';
import { Grid } from 'semantic-ui-react';
import Ticker from './Ticker';

const Table = () => {
  return (
    <div>
      <Grid columns={3}>
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
};

export default Table;
