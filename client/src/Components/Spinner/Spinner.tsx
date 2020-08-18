import React from 'react';
import styles from './Spinner.module.scss';

interface PropTypes {
  boxHeight: number;
}

const Spinner: React.FC<PropTypes> = ({ boxHeight }) => (
  <div style={{ height: `${boxHeight}px` }} className={styles.Spinner}>
    <div className={styles.spin} data-testid="Spinner"></div>
  </div>
);

export default Spinner;
