import React from 'react';
import { Icon } from 'semantic-ui-react';

import './Sidebar.scss';

interface Props {
  // ok?: boolean; // ? if not mandatory prop
  // fb?: (bob: string) => void; // return void if no return, (number,string)
  width: number;
  height: string;
  children: React.ReactNode;
}

const Sidebar: React.FC<Props> = ({ width, height, children }) => {
  // const [xPosition, setX] = React.useState<number | null>(-width);

  // React.useEffect(() => {
  //   // (() => {
  //   // })();
  //   setX(0);
  // }, []);

  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <h2 className="logo">BitPocket</h2>
        <li className="sidebar-item">
          <a href="/" className="sidebar-link">
            <Icon name="home" size="big" />
            <span className="link-text logo-text">Home</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/" className="sidebar-link">
            <Icon name="plus" size="big" />
            <span className="link-text logo-text">Create orders</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/" className="sidebar-link">
            <Icon name="list" size="big" />
            <span className="link-text logo-text">View orders</span>
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/" className="sidebar-link">
            <Icon name="setting" size="big" />
            <span className="link-text logo-text">Settings</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
