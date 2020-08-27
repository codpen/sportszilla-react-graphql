import React, { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react';
import { PALETTE } from '@zendeskgarden/react-theming';
import { Avatar } from '@zendeskgarden/react-avatars';
import { useQuery, useLazyQuery, gql } from '@apollo/client';

import styles from './Profile.module.scss';
import { UserData } from '../UserData';
import { EventData } from '../../Board/Event';
import TableEvent from './TableEvent/TableEvent';
import FavouriteSports from './FavouriteSports/FavouriteSports';
import Loader from '../../Loader/Loader';

const USER = gql`
  query getOneUser($ID: Float!) {
    getOneUser(ID: $ID) {
      ID
      firstName
      lastName
      userName
      birthday
      favSports {
        ID
        sportName
      }
      participates {
        ID
        eventName
        timeStart
        location
        maxParticipants
        participants {
          ID
        }
        sport {
          ID
          sportName
        }
      }
    }
  }
`;

interface PropTypes {
  user: UserData | undefined;
  setUser: Dispatch<SetStateAction<UserData>>;
  events: EventData[];
}

interface Response {
  getOneUser: UserData;
}

const Profile: React.FC<PropTypes> = ({ user: user, setUser, events }) => {
  console.log(events);
  const userObject = JSON.parse(localStorage.getItem('userInformation') || '{}');
  const { loading, data, error } = useQuery<Response>(USER, { variables: { ID: userObject.ID } });
  const [aUser, setAUser] = useState(userObject);

  useEffect(() => {
    if (data && data.getOneUser) {
      localStorage.setItem('userAllInformation', JSON.stringify(data.getOneUser));
    }
  }, [loading]);

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
      <FavouriteSports sports={user && user.favSports} />
      <div className={styles.eventCtn}>
        <TableEvent
          tableName={'Created Events'}
          events={
            events[0].participants &&
            events.filter((event) => {
              return event.participants?.[0].ID === userObject.ID;
            })
          }
        />
        <TableEvent
          tableName={'Joined Events'}
          events={
            events[0].participants &&
            events.filter((event) => {
              return event.participants?.filter((user) => user.ID === userObject.ID);
            })
          }
        />
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

const friendList = [
  {
    ID: 2,
    firstName: 'Philip',
    lastName: 'Johnson',
    location: '277 Bedford Ave, Barcelona',
  },
  {
    ID: 5,
    firstName: 'John',
    lastName: 'Furniture',
    location: '3452  Whispering Pines Circle',
  },
  {
    ID: 5,
    firstName: 'Patty',
    lastName: 'Boe',
    location: '3064  Joyce Street Santa Cruz de Tenerife',
  },
  {
    ID: 5,
    firstName: 'Olive',
    lastName: 'Yew',
    location: 'Maestro Puig Valera 41 Bande Ourense',
  },
  {
    ID: 5,
    firstName: 'Aida',
    lastName: 'Bugg',
    location: 'Bouciña 54 Tapia De Casariego',
  },
];
