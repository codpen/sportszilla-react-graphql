import React from 'react';
import styles from './Board.module.scss';
import SportList from '../SportList/SportList';
import EventList from '../EventList/EventList';
import Map from '../Map/Map';

const Board: React.FC = () => (
  <div className={styles.Board} data-testid="Board">
    <SportList />
    <EventList />
    <p> Test rendering somthing</p>
    <div className={styles.mapContainer}>
      <Map />
    </div>
  </div>
);

export default Board;
