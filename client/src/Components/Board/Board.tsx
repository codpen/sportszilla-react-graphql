import React from 'react';
import styles from './Board.module.scss';

interface PropTypes {
  numberProp: number;
  stringProp: string;
}
const Board: React.FC<PropTypes> = ({ numberProp, stringProp }) => (
  <div className={styles.Board} data-testid="Board">
    Board Component
    <h1>{stringProp}</h1>
    <h2>{numberProp}</h2>
  </div>
);

export default Board;
