import React, { ReactElement, Dispatch, SetStateAction }  from 'react';
import styles from './Profile.module.scss';
import { UserData } from '../UserData';

interface PropTypes {
  user: UserData
  setUser: Dispatch<SetStateAction<UserData>>;
}
function Profile({ user, setUser }: PropTypes): ReactElement {

  return (
    <div className={styles.Profile} data-testid="Profile">
      Profile Component
    </div>
  )
};

export default Profile;
