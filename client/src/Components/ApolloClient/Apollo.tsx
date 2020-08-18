import React from 'react';
import styles from './Apollo.module.scss';
import Read from './Read/Read';
import Create from './Create/Create';
import Update from './Update/Update';
import Delete from './Delete/Delete';

const Apollo: React.FC = () => (
  <div className={styles.Apollo} data-testid="Apollo">
    <Read />
    <Create />
    <Update />
    <Delete />
  </div>
);

export default Apollo;
