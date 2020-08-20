import React from 'react';
import styles from './EventLogin.module.scss';
import ButtonGeneric from '../ButtonGeneric/ButtonGeneric';
import Moment from 'react-moment';
import Faker from 'faker';

type Event = {
  id: number;
  sport_id: number;
  sport_name: string;
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

interface PropTypes {
  event: Event;
}

const EventLogin: React.FC<PropTypes> = ({ event }) => {
  const randomDate = Faker.fake('{{date.future}}');
  const randomAddress = Faker.fake(
    '{{address.streetAddress}}, {{address.zipCode}} {{address.city}}'
  );
  const randomAvatar = Faker.fake('{{internet.avatar}}');
  const randomList = [
    <img
      className={styles.EventBox_center_pic}
      src={Faker.fake('{{internet.avatar}}')}
      alt="profile_pic"
    />,
    <img
      className={styles.EventBox_center_pic}
      src={Faker.fake('{{internet.avatar}}')}
      alt="profile_pic"
    />,
    <img
      className={styles.EventBox_center_pic}
      src={Faker.fake('{{internet.avatar}}')}
      alt="profile_pic"
    />,
  ];

  return (
    <div className={styles.Container}>
      <div className={styles.Head}>
        <div className={styles.EventTitle}>
          <h2 className={styles.Title}>{event.description}</h2>
          <div>
            <img src={require('../../Images/FormIcons/pin.svg')} alt="" />
            <p>{randomAddress}</p>
          </div>
        </div>
        <img src={require(`../../Images/SportIcons/${event.sport_name}.svg`)} alt="" />
      </div>

      <div className={styles.EventLogin} data-testid="EventLogin">
        <div className={styles.EventBox_left}>
          <h4>
            <p>
              <Moment format="D MMM">{randomDate}</Moment>
            </p>
            <div className={styles.EventBox_Left_Time}>
              <div>{event.time_start}</div>-<div>{event.time_end}</div>
            </div>
          </h4>
        </div>
        <div className={styles.EventBox_center}>
          <h4>
            <span>
              Participants: {''}
              {event.min_participants} / {event.max_participants}
            </span>
          </h4>
          <div>{randomList}</div>
        </div>
        <div className={styles.EventBox_right}>
          <ButtonGeneric buttonText={'join'} buttonLink={'/join'}></ButtonGeneric>
        </div>
      </div>
    </div>
  );
};

export default EventLogin;
