import React from 'react';
import styles from './Board.module.scss';

import ButtonGeneric from '../ButtonGeneric/ButtonGeneric';
import SportList from '../SportList/SportList';
import EventList from '../EventList/EventList';
import Button from 'react-bootstrap/Button';

const Board: React.FC = () => (
  <div className={styles.Board} data-testid="Board">
    <div className={styles.Board_Title}>
      <h1>Find Your Next Teammates</h1>
    </div>
    <div>
      <ButtonGeneric buttonText="Join Now" buttonLink="#" />
      <Button variant="secondary">Secondary</Button>
    </div>
  </div>
);

export default Board;
