import React, { useState } from 'react';
import styles from './EventList.module.scss';
import EventLogin from '../EventLogin/EventLogin';
import Data from '../../mockData/data.json';
import SearchBar from '../SearchBar/SearchBar';
import Map from '../Map/Map';

const EventList: React.FC = () => {
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

  const [event, setEvent] = useState<Event[]>(Data.events);

  const list = event.map((event) => {
    return (
      <div>
        <EventLogin event={event} />
      </div>
    );
  });

  const arrowIcon = require('../../Images/FormIcons/down-arrow.svg');

  return (
    <div className={styles.Container}>
      <div className={styles.Container1}>
        <SearchBar />
        <div className={styles.EventList} data-testid="EventList">
          {list}
        </div>
        <div className={styles.Button}>
          <button>
            <p>Map View</p>
            <img src={arrowIcon} alt="down-arrow" />
          </button>
        </div>
      </div>
      <div className={styles.Map}>
        <Map />
      </div>
    </div>
  );
};

export default EventList;
