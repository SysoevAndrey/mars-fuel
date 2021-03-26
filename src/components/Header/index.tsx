import React from 'react';
import './Header.scss';
import { useFuelContext } from '../../context';

const Header = ({ showTime }: { showTime?: boolean }) => {
  const {
    state: {
      actualData: { currentMonthString },
    },
  } = useFuelContext();
  return (
    <header className="header">
      <p className="header__logo">MarsFuel</p>
      {showTime && <p className="header__date-info">{currentMonthString}</p>}
    </header>
  );
};

export default Header;
