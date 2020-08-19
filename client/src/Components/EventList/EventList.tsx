import React, { useState } from 'react';
import styles from './EventList.module.scss';
import EventLogin from '../EventLogin/EventLogin';
import Data from '../../mockData/data.json';
import SearchBar from '../SearchBar/SearchBar';

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

  return (
    <>
      <SearchBar />
      <div className={styles.EventList} data-testid="EventList">
        {list}
      </div>
    </>
  );
};

export default EventList;
