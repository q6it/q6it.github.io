import React, { useState } from 'react';
import { Grid, Image, Segment, Menu, Icon, Header } from 'semantic-ui-react';

import { Ticker } from './components/Ticker';
import { Order } from './containers/Order/Order';
import Sidebar from './components/Sidebar/Sidebar';

// import logo from './logo.svg';
// import Table from './components/Table';
import './App.scss';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="App">
      <Sidebar />
      <Order />
    </div>
  );
}

export default App;

// (
// <Grid doubling columns={2} className="app--grid">
//         <Grid.Row className="app--row">
//           <Grid.Column mobile={16} tablet={8} computer={4}>
//
//             <Sidebar.Pushable>
//               <Sidebar
//                 as={Menu}
//                 animation="overlay"
//                 icon="labeled"
//                 inverted
//                 vertical
//                 visible={visible}
//                 width="wide"
//               >
//                 <Menu.Item as="a">
//                   <Icon name="home" />
//                   Home
//                 </Menu.Item>
//                 <Menu.Item as="a">
//                   <Icon name="gamepad" />
//                   Create order
//                 </Menu.Item>
//                 {/* <Menu.Item as="a">
//                 <Icon name="camera" />
//                 Channels
//               </Menu.Item> */}
//               </Sidebar>
//             </Sidebar.Pushable>

//           </Grid.Column>
//           <Grid.Column>
//             <Order />
//           </Grid.Column>
//           {/* <Grid.Column /> */}
//         </Grid.Row>

//       </Grid>
// )
