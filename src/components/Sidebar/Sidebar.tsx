import React from 'react';

import './Sidebar.scss';

interface Props {
  // ok?: boolean; // ? if not mandatory prop
  // fb?: (bob: string) => void; // return void if no return, (number,string)
  width: number;
  height: string;
  children: React.ReactNode;
}

const Sidebar: React.FC<Props> = ({ width, height, children }) => {
  console.log('🚀 ~ file: Sidebar.tsx ~ line 14 ~ children', children);
  const [xPosition, setX] = React.useState<number | null>(-width);

  React.useEffect(() => {
    // (() => {
    // })();
    setX(0);
  }, []);

  return (
    <div className="sidebar" /* style={{ width, height }} */>
      <>{children}</>
    </div>
  );
};

export default Sidebar;
