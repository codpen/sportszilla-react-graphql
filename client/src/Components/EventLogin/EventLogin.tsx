import React from 'react';
import styles from './EventLogin.module.scss';

interface PropTypes {
  event: {
    id: number;
    sport_id: number;
    location: object;
    date: string;
    description: string;
    organizer: number;
    filter: object;
    time_start: string;
    time_end: string;
    registered_participats: number[];
    max_participants: number;
    min_participants: number;
  };
}

const EventLogin: React.FC<PropTypes> = ({ event }) => (
  <div className={styles.EventLogin} data-testid="EventLogin">
    <div>
      <img src="" alt="" />
    </div>
    <div>
      <h4>
        <span>{event.date}</span>
        <span>
          {event.time_start} - {event.time_end}
        </span>
      </h4>
      <h2>{event.description}</h2>
      <h4>{event.location}</h4>
    </div>
    <div>
      <div>
        Organizer: <img src="" alt="" /> <span>{event.organizer}</span>
      </div>
      <div>
        Participants: {event.min_participants} / {event.max_participants}
        <div>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
      <div>
        <button></button>
      </div>
    </div>
  </div>
);

export default EventLogin;
