import React from 'react';
import { Link } from 'react-router-dom';
import { EventBS } from '../Board/eventBS';
import Moment from 'react-moment';
import Faker from 'faker';
import ButtonGeneric from '../ButtonGeneric/ButtonGeneric';
import styles from './EventLogin.module.scss';

type PropTypes = {
  event: EventBS;
};

const EventLogin: React.FC<PropTypes> = ({ event }) => {
  const randomDate = Faker.fake('{{date.future}}');
  const randomAddress = Faker.fake(
    '{{address.streetAddress}}, {{address.zipCode}} {{address.city}}'
  );
  const randomAvatar = Faker.fake('{{internet.avatar}}');
  const randomList = [
    <img
      key="1"
      className={styles.EventBox_center_pic}
      src={Faker.fake('{{internet.avatar}}')}
      alt="profile_pic"
    />,
    <img
      key="2"
      className={styles.EventBox_center_pic}
      src={Faker.fake('{{internet.avatar}}')}
      alt="profile_pic"
    />,
    <img
      key="3"
      className={styles.EventBox_center_pic}
      src={Faker.fake('{{internet.avatar}}')}
      alt="profile_pic"
    />,
  ];

  return (
    <div className={styles.Container}>
      <div className={styles.Head}>
        <div className={styles.EventTitle}>
          <Link style={{ textDecoration: 'none', color: '#000000' }} to={`/event/1`}>
            <h2 className={styles.Title}>{event.eventName}</h2>
          </Link>
          <div>
            <img src={require('../../Images/FormIcons/pin.svg')} alt="" />
            <p>{randomAddress}</p>
          </div>
        </div>
        <img src={require(`../../Images/SportIcons/${event.sportName}.svg`)} alt="" />
      </div>

      <div className={styles.EventLogin} data-testid="EventLogin">
        <div className={styles.EventBox_left}>
          <h4>
            <p>
              <Moment format="D MMM">{event.date}</Moment>
            </p>
            <div className={styles.EventBox_Left_Time}>
              <div>{event.timeStart}</div>-<div>{event.timeEnd}</div>
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
