import React, { useState } from 'react';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Avatar } from '@zendeskgarden/react-avatars';
import { ReactComponent as UserIcon } from '@zendeskgarden/svg-icons/src/16/user-solo-stroke.svg';

import ButtonGeneric from '../../ButtonGeneric/ButtonGeneric';
import EventLogin from '../../EventLogin/EventLogin';
import styles from './Profile.module.scss';
import { UserData } from '../UserData';

import Data from '../../../mockData/data.json';
import image from '../../../Images/profile.jpg';
import { element } from 'prop-types';

type Event = {
  id: number;
  sport_id: number;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  date: string;
  description: string;
  organizer: number;
  filter: {
    target_gender: string;
    target_level: string;
  };
  time_start: string;
  time_end: string;
  registered_participants: number[];
  max_participants: number;
  min_participants: number;
};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  date_birth: string;
  sport_interest: number[];
  Location: { latitude: number; longitude: number; accuracy: number };
  gender: string;
};

interface PropTypes {
  user: User | undefined;
}

const Profile: React.FC<PropTypes> = ({ user }) => {
  const [event, setEvent] = useState<Event[]>(Data.events);

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
        <Avatar backgroundColor={PALETTE.grey[600]} size="large">
          <Avatar.Text>{user?.first_name[0]}</Avatar.Text>
        </Avatar>
        <h2>
          {user?.first_name} {user?.last_name}
        </h2>
      </div>
      <div className={styles.btnCnt}>
        <ButtonGeneric buttonText="Create Event" buttonLink="/event/" />
        <ButtonGeneric buttonText="Join" buttonLink="/board/" />
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
