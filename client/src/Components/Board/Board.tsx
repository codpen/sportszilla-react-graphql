import React from 'react';
import styles from './Board.module.scss';
import SportList from '../SportList/SportList';
import EventList from '../EventList/EventList';

const Board: React.FC = () => (
  <div className={styles.Board} data-testid="Board">
    <SportList />
    <EventList />
  </div>
);

export default Board;
