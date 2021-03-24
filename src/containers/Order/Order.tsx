import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';

import { TopBar } from '../../components/TopBar/TopBar';
import { OrderSettings } from '../../components/OrderSettings/OrderSettings';

import './Order.scss';

export const Order: React.FC = () => {
  return (
    <div className="order">
      <Grid centered columns={2} padded>
        <Grid.Row>
          <TopBar />
        </Grid.Row>
        <Grid.Row>
          <OrderSettings />
        </Grid.Row>
      </Grid>
    </div>
  );
};
