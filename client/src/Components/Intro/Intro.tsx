import React from 'react';
import styles from './Intro.module.scss';

import ButtonGeneric from '../ButtonGeneric/ButtonGeneric';
import Map from '../Map/Map';

const Intro: React.FC = () => (
  <div className={styles.Intro} data-testid="Board">
    <div className={styles.Intro_Title}>
      <h1>Find Your Next Teammates</h1>
    </div>
    <div>
      <ButtonGeneric buttonText="Join Now" buttonLink="#" />
    </div>
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <Map />
      </div>
    </div>
  </div>
);

export default Intro;
