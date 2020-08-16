import React from 'react';
import ButtonGeneric from '../ButtonGeneric/ButtonGeneric';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../Images/DinoLogo.svg';

const Navbar: React.FC = () => {
  return (
    <div className={styles.Navbar} data-testid="Navbar">
      <div className={styles.NavbarLeft}>
        <Link to="/"></Link>
        <img className={styles.NavbarLeft_logo_img} src={logo} alt="logo" />
        <p className={styles.NavbarLeft_logo_name}>sportzilla</p>
      </div>
      <div className={styles.NavbarRight}>
        <div>
          <ButtonGeneric buttonText="register" buttonLink="/register" />
        </div>
        <div>
          <ButtonGeneric buttonText="login" buttonLink="/login" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
