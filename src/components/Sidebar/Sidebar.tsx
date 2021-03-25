import React from 'react';
import { Icon } from 'semantic-ui-react';

import './Sidebar.scss';

interface Props {
  width: number;
  height: string;
  children: React.ReactNode;
}

const Sidebar: React.FC<Props> = () => {
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
