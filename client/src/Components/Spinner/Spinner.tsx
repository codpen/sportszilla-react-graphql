import React from 'react';
import styles from './Spinner.module.scss';

const Spinner: React.FC = () => (
  <div className={styles.Spinner}>
    <div className={styles.spin} data-testid="Spinner"></div>
  </div>
);

export default Spinner;
