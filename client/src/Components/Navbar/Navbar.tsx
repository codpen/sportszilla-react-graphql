import React, { useState, useEffect } from 'react';
import ButtonGeneric from '../ButtonGeneric/ButtonGeneric';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../Images/godzilla.svg';
import logoBall from '../../Images/filled-circle.svg';
import hamburger from '../../Images/open-menu.svg';
import DropMenu from '../DropMenu/DropMenu';
import logo1 from '../../Images/Logo/LogoMakr_7xg4JO.png'

const Navbar: React.FC = () => {
  return (
    <div className={styles.Navbar} data-testid="Navbar">
      <div className={styles.logoContainer}>
        <Link className={styles.NavbarLeft} to="/">
          <img className={styles.NavbarLeft_logo_img} src={logo1} alt="logo" />
          {/* <img className={styles.NavbarLeft_logo_ball} src={logoBall} alt="logoBall" /> */}
        </Link>
      </div>
      <div className={styles.NavbarRight}>
        <DropMenu />
      </div>
    </div>
  );
};

export default Navbar;
