import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Join.module.scss';
import ButtonGeneric from '../../ButtonGeneric/ButtonGeneric';

const Join: React.FC = () => (
  <div className={styles.Join} data-testid="Join">
    <h2 className={styles.welcome}>Welcome to SportsZilla!</h2>
    <div className={styles.authBoxes}>
      <section>
        <ButtonGeneric buttonText="Log&nbsp;in" buttonLink="/user/login" />
      </section>

      <section>
        <ButtonGeneric buttonText="Sign&nbsp;up" buttonLink="/user/signup" />
      </section>
    </div>
  </div>
);

export default Join;
