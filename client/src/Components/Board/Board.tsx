import React from 'react';
import styles from './Board.module.scss';

const Board: React.FC = () => (
  <div className={styles.Board} data-testid="Board">
    Board Component
  </div>
);

export default Board;
