import React from 'react';
import styles from './Intro.module.scss';
import Data from '../../mockData/data.json';
import ButtonGeneric from '../ButtonGeneric/ButtonGeneric';
import Map from '../Map/Map';
import { EventData } from '../Board/Event';

interface PropTypes {
  events: EventData[];
}

const Intro: React.FC<PropTypes> = ({ events }) => (
  <div className={styles.Intro} data-testid="Intro">
    <div className={styles.Intro_Title}>
      <h1>Find Your Next Teammates</h1>
    </div>
    <div>
      <ButtonGeneric buttonText="Events" buttonLink="/board/" />
      <ButtonGeneric buttonText="Join Now" buttonLink="/user/join/" />
    </div>
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <Map events={events} />
      </div>
    </div>
  </div>
);

export default Intro;
