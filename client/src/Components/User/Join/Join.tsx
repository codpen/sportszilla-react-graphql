import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonGeneric from '../../ButtonGeneric/ButtonGeneric';
import { LoginRequest, jwtToken } from '../LoginRequest';
import styles from './Join.module.scss';

interface PropTypes {
  loginRequest: LoginRequest<jwtToken>;
}
function Join({ loginRequest }: PropTypes): ReactElement {
  const history = useHistory();
  const hash = history.location.hash;
  const fbToken = hash.substring(hash.indexOf('=') + 1);
  if (hash) {
    loginRequest({ fbToken }, 'Face' )
    .then((resp) => {
      console.log(resp);
    })
  }

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
};

export default Join;
