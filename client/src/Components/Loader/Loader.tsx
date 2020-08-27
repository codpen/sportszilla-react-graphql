import React from 'react';
import { Dots } from '@zendeskgarden/react-loaders';
import styles from './Loader.module.scss';

const Loader: React.FC = () => (
  <div style={{ height: '100vh' }} className={styles.Loader}>
    <Dots />
  </div>
);

export default Loader;
