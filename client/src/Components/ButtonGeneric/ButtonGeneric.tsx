import React from 'react';
import styles from './ButtonGeneric.module.scss';
import { Link } from 'react-router-dom';

interface PropTypes {
  buttonText: string;
  buttonLink: string;
}

const ButtonGeneric: React.FC<PropTypes> = ({ buttonText, buttonLink }) => (
  <div className="wrap">
    <Link to={buttonLink}>
      <button className={styles.ButtonGeneric} data-testid="ButtonGeneric">
        <strong>{buttonText}</strong>
      </button>
    </Link>
  </div>
);

export default ButtonGeneric;
