import React from 'react';
import styles from './ButtonGeneric.module.scss';
import { Link } from 'react-router-dom';

interface PropTypes {
  buttonText: string;
  buttonLink: string;
}

const ButtonGeneric: React.FC<PropTypes> = ({ buttonText, buttonLink }) => (
  <div className="wrap">
    <button className={styles.ButtonGeneric} data-testid="ButtonGeneric">
      <Link to={buttonLink}></Link>
      <strong>{buttonText}</strong>
    </button>
  </div>
);

export default ButtonGeneric;
