import React from 'react';
import { Dots } from '@zendeskgarden/react-loaders';
import styles from './Loader.module.scss';

interface PropTypes {
  boxHeight: number;
}

const Loader: React.FC<PropTypes> = ({ boxHeight }) => (
  <div style={{ height: `${boxHeight}px` }} className={styles.Loader}>
    <Dots />
  </div>
);

export default Loader;
