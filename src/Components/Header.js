import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <span className="header-logo"></span>
        <h1 className="header-title"> Pomofocus </h1>
      </div>
      {/* <div className="header-right">
        <button className="header-button">📊 Report</button>
        <button className="header-button">⚙️ Setting</button>
        <button className="header-button">👤 Sign In</button>
        <button className="header-button">⋮</button> 
      </div>*/}
    </header>
  );
}

export default Header;