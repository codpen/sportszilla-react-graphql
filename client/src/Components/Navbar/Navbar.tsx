import React from 'react';
import ButtonGeneric from '../ButtonGeneric/ButtonGeneric';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../Images/DinoLogo.svg';

const Navbar: React.FC = () => {
  return (
    <div className={styles.Navbar} data-testid="Navbar">
      <Link className={styles.NavbarLeft} to="/">
        <img className={styles.NavbarLeft_logo_img} src={logo} alt="logo" />
        <p className={styles.NavbarLeft_logo_name}>sportzilla</p>
      </Link>

      <div className={styles.NavbarRight}>
        <div>
          <Link className={styles.LoginLink} to="/login">
            login
          </Link>
        </div>
        <div>
          <ButtonGeneric buttonText="register" buttonLink="/register" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
