import React from 'react';
import styles from './Board.module.scss';
import SportList from '../SportList/SportList';

const Board: React.FC = () => (
  <div className={styles.Board} data-testid="Board">
    <SportList />
  </div>
);

export default Board;
