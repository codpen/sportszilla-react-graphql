import React, { ReactElement, Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
import { UserData } from '../UserData';
import ButtonGeneric from '../../ButtonGeneric/ButtonGeneric';
import { LoginRequest, LoginResp } from '../LoginRequest';
import styles from './Join.module.scss';

interface PropTypes {
  loginRequest: LoginRequest<LoginResp>;
  setUser: Dispatch<SetStateAction<UserData>>;
}
function Join({ loginRequest, setUser }: PropTypes): ReactElement {
  const history = useHistory();
  const hash = history.location.hash;
  const fbToken = hash.substring(hash.indexOf('=') + 1);

  const handleResponse = (resp: LoginResp) => {
    const { jwtToken, user } = resp;
    localStorage.setItem('jwtToken', jwtToken);
    setUser(user);
    history.push('/user/profile');
  };

  if (hash) {
    loginRequest({ fbToken }, 'Face' )
    .then(handleResponse);
  }

  return (
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
  )
};

export default Join;
