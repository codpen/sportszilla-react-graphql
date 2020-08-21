import React, { useState, Dispatch, SetStateAction } from 'react';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Avatar } from '@zendeskgarden/react-avatars';
import { ReactComponent as UserIcon } from '@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg';

import ButtonGeneric from '../../ButtonGeneric/ButtonGeneric';
import EventLogin from '../../EventLogin/EventLogin';
import styles from './Profile.module.scss';

import Data from '../../../mockData/data.json';
import image from '../../../Images/profile.jpg';
import { element } from 'prop-types';
import { UserData } from '../UserData';

interface PropTypes {
  user: UserData;
  setUser: Dispatch<SetStateAction<UserData>>;
}

const Profile: React.FC<PropTypes> = ({ user, setUser }) => {
  const [event, setEvent] = useState<Event[]>(Data.events);
  const mockUser = Data.users[0];
  const listFriends = Data.users.map((user) => {
    return (
      <li>
        <Avatar backgroundColor={PALETTE.grey[600]} size="extrasmall">
          <Avatar.Text>{user?.first_name[0]}</Avatar.Text>
        </Avatar>
        <p>
          {user.first_name} {user.last_name}
        </p>
      </li>
    );
  });

  return (
    <div className={styles.Profile} data-testid="Profile">
      <div className={styles.spacer}></div>
      <div className={styles.avatarCnt}>
        <Avatar backgroundColor={PALETTE.grey[600]} style={{ height: '70px', width: '70px' }}>
          <Avatar.Text>{mockUser?.first_name[0]}</Avatar.Text>
        </Avatar>
        <h2>
          {mockUser?.first_name} {mockUser?.last_name}
        </h2>
      </div>
      <div className={styles.btnCnt}>
        <ButtonGeneric buttonText="Create Event" buttonLink="/event/" />
      </div>
      <div className={styles.eventCtn}>
        <EventLogin event={event[0]} />
      </div>
      <div className={styles.friendCtn}>
        <div>
          <input placeholder="Search friends" />
        </div>
        <ul>{listFriends}</ul>
      </div>
    </div>
  );
};

export default Profile;
