import React from 'react';
import styles from './EventLogin.module.scss';
import ButtonGeneric from '../ButtonGeneric/ButtonGeneric';

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

interface PropTypes {
  event: Event;
}

const EventLogin: React.FC<PropTypes> = ({ event }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.EventTitle}>
        <h2 className={styles.Title}>{event.description}</h2>
      </div>
      <div className={styles.EventLogin} data-testid="EventLogin">
        <div className={styles.EventBox}>
          <h4>
            <p>{event.date}</p>
            <span>
              {event.time_start} - {event.time_end}
            </span>
          </h4>
        </div>
        <div className={styles.EventBox}>
          <h4>
            Organizer:<span>{event.organizer}</span>
          </h4>
          <h4>
            Participants:{' '}
            <span>
              {event.min_participants} / {event.max_participants}
            </span>
          </h4>
        </div>
        <div className={styles.EventBox}>
          <ButtonGeneric buttonText={'join'} buttonLink={'/join'}></ButtonGeneric>
        </div>
      </div>
    </div>
  );
};

export default EventLogin;