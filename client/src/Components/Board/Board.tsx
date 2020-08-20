import React from 'react';
import styles from './Board.module.scss';

import ButtonGeneric from '../ButtonGeneric/ButtonGeneric';
import SportList from '../SportList/SportList';
import EventList from '../EventList/EventList';
import Map from '../Map/Map';

const Board: React.FC = () => (
  <div className={styles.Board} data-testid="Board">
    <div className={styles.Board_Title}>
      <h1>Find Your Next Teammates</h1>
    </div>
    <div>
      <ButtonGeneric buttonText="Find Events" buttonLink="/user/profile/" />
      <ButtonGeneric buttonText="Join Now" buttonLink="#" />
    </div>
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <Map />
      </div>
    </div>
  </div>
);

export default Board;
