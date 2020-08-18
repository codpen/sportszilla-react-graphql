import React from 'react';
import styles from './Spinner.module.scss';

interface PropTypes {
  boxHeight: number;
}

const Loader: React.FC<PropTypes> = ({ boxHeight }) => (
  <div style={{ height: `${boxHeight}px` }} className={styles.Loader}>
    <div className={styles.spin} data-testid="Loader"></div>
  </div>
);

export default Loader;
