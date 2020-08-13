import React from 'react';
import styles from './Navbar.module.scss';

const Navbar: React.FC = () => (
  <div className={styles.Navbar} data-testid="Navbar">
    Navbar Component
  </div>
);

export default Navbar;
