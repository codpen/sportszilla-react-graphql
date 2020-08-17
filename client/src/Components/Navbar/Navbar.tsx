import React from 'react';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => (
  <div className={styles.Navbar} data-testid="Navbar">
    <div>SportZilla</div>
    <div>Login</div>
  </div>
);

export default Navbar;
