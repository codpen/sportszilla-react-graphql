import React, { useState, Dispatch, SetStateAction } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Avatar } from '@zendeskgarden/react-avatars';

import ButtonGeneric from '../../ButtonGeneric/ButtonGeneric';
import styles from './Profile.module.scss';

import Data from '../../../mockData/data.json';
import { UserData } from '../UserData';
import TableEvent from './TableEvent/TableEvent';

interface PropTypes {
  user: UserData | undefined;
  setUser: Dispatch<SetStateAction<UserData>>;
}

const Profile: React.FC<PropTypes> = ({ user: user, setUser }) => {
  const [aUser, setAUser] = useState(user);
  const [event, setEvent] = useState<Event[]>(Data.events);
  const mockUser = Data.users[0];

  const handleClick = (user: any) => {
    console.log(user);
    setAUser({
      ID: 1,
      firstName: user.first_name,
      lastName: 'Top',
    });
  };

  const listFriends = Data.users.map((user) => {
    return (
      <li>
        <Avatar backgroundColor={PALETTE.grey[600]} size="extrasmall">
          <Avatar.Text>{user?.first_name[0]}</Avatar.Text>
        </Avatar>
        <p onClick={() => handleClick(user)}>
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
          <Avatar.Text>{user?.firstName}</Avatar.Text>
        </Avatar>
        <h2>
          {aUser?.firstName} {user?.lastName}
        </h2>
        <p>277 Bedford Ave, Brooklyn, NY 11211</p>
      </div>
      <div className={styles.btnCnt}>
        <ButtonGeneric buttonText="Create Event" buttonLink="/event/" />
      </div>
      <div className={styles.eventCtn}>
        <TableEvent tableName={'Created Events'} events={undefined} />
        <TableEvent tableName={'Upcoming Events'} events={undefined} />
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

Profile.defaultProps = {
  user: {
    ID: 1,
    firstName: 'Joe',
    lastName: 'Doe',
  },
};

export default Profile;
