import React from 'react';
import { Link } from 'react-router-dom';
import { EventData } from '../Board/Event';
import Moment from 'react-moment';
import Faker from 'faker';
import ButtonGeneric from '../ButtonGeneric/ButtonGeneric';
import styles from './EventLogin.module.scss';

type PropTypes = {
  event: EventData;
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
            <p>{event.location}</p>
          </div>
        </div>
        <img src={require(`../../Images/SportIcons/${event.sport?.sportName}.svg`)} alt="" />
      </div>

      <div className={styles.EventLogin} data-testid="EventLogin">
        <div className={styles.EventBox_left}>
          <h4>
            <p>
              <Moment format="D MMM">{event.timeStart}</Moment>
            </p>

            <div className={styles.EventBox_Left_Time}>
              <div>
                <Moment format="HH:MM">{event.timeStart}</Moment>
              </div>
              -
              <div>
                <Moment format="HH:MM">{event.timeEnd}</Moment>
              </div>
            </div>
          </h4>
        </div>
        <div className={styles.EventBox_center}>
          <h4>
            <span>
              Participants: {''}
              {event.minParticipants} / {event.maxParticipants}
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
