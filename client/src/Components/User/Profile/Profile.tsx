import React, { useState, Dispatch, SetStateAction } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Avatar } from '@zendeskgarden/react-avatars';

import ButtonGeneric from '../../ButtonGeneric/ButtonGeneric';
import styles from './Profile.module.scss';
import { UserData } from '../UserData';
import TableEvent from './TableEvent/TableEvent';
import FavouriteSports from './favouriteSports/FavouriteSports';

const friendList = [
  {
    ID: 2,
    firstName: 'Philip',
    lastName: 'Johnson',
    location: '277 Bedford Ave, Brooklyn, NY 11211',
  },
  {
    ID: 5,
    firstName: 'John',
    lastName: 'Furniture',
    location: '277 Bedford Ave, Brooklyn, NY 11211',
  },
];

interface PropTypes {
  user: UserData | undefined;
  setUser: Dispatch<SetStateAction<UserData>>;
}

const Profile: React.FC<PropTypes> = ({ user: user, setUser }) => {
  const [aUser, setAUser] = useState(user);

  const handleClick = (user: any) => {
    console.log(user);
    setAUser({
      ID: 1,
      firstName: user.first_name,
      lastName: 'Top',
    });
  };

  const listFriends =
    aUser &&
    aUser.friends &&
    friendList.map((user: UserData) => {
      return (
        <li>
          <Avatar backgroundColor={PALETTE.grey[600]} size="extrasmall">
            <Avatar.Text>{user.firstName && user.firstName[0]}</Avatar.Text>
          </Avatar>
          <p onClick={() => handleClick(user)}>
            {user.firstName} {user.lastName}
          </p>
        </li>
      );
    });

  return (
    <div className={styles.Profile} data-testid="Profile">
      <div className={styles.spacer}></div>
      <div className={styles.avatarCnt}>
        <Avatar backgroundColor={PALETTE.grey[600]} style={{ height: '75px', width: '100px' }}>
          <Avatar.Text style={{ fontSize: '30px' }}>
            {user?.firstName && user?.firstName[0]}
          </Avatar.Text>
        </Avatar>
        <div>
          <h2>
            {aUser?.firstName} {aUser?.lastName}
          </h2>
          <p>{aUser?.location}</p>
        </div>
      </div>
      <FavouriteSports />
      <div className={styles.eventCtn}>
        <TableEvent tableName={'Created Events'} events={undefined} />
        <TableEvent tableName={'Upcoming Events'} events={undefined} />
      </div>
      <div className={styles.friendCtn}>
        <input placeholder="Search friends" />
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
    location: 'Bedford Ave, Brooklyn',
    friends: [2, 3, 4],
    createdEvents: [],
    joinedEvents: [],
    favouriteSports: [],
  },
};

export default Profile;
