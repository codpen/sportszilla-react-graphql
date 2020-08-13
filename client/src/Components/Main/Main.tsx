import React from 'react';
import logo from '../../Images/logo.svg';
import './Main.scss';

function Main() {
  return (
    <div className="Main">
      <header className="Main-header">
        <img src={logo} className="Main-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="Main-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Main;
