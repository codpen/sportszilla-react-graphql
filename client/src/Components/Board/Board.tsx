import React, { useState } from 'react';
import moment from 'moment';
import { EventData } from './Event';
import styles from './Board.module.scss';
import EventLogin from '../EventLogin/EventLogin';
import SearchBar from '../SearchBar/SearchBar';
import { HashLink as Link } from 'react-router-hash-link';
import Map from '../Map/Map';

interface PropTypes {
  events: EventData[];
}

const Board: React.FC<PropTypes> = ({ events }) => {
  const eventList = [...events];

  const [allEvents, setAllEvents] = useState<any>(eventList);

  const list = allEvents.map((event: EventData) => {
    return (
      <div key={`${event.ID} ${event.sport?.sportName}`}>
        <EventLogin event={event} />
      </div>
    );
  });

  const filterBySport = (sport: any) => {
    setAllEvents(
      events.filter((e) => {
        return e.sport?.sportName === sport;
      })
    );
  };

  const filterByDate = (date: any) => {
    setAllEvents(
      events.filter((e) => {
        return moment(e.timeStart).format('MMMM Do YYYY') === moment(date).format('MMMM Do YYYY');
      })
    );
  };

  const arrowIcon = require('../../Images/FormIcons/down-arrow.svg');
  const arrowIconUp = require('../../Images/FormIcons/up-arrow.svg');

  return (
    <div className={styles.Container}>
      <div id="list" className={styles.Container1}>
        <SearchBar filterBySport={filterBySport} filterByDate={filterByDate} />
        <div className={styles.Board} data-testid="Board">
          {list}
        </div>
        <div className={styles.Button}>
          <Link smooth to="/Board/#map">
            <button>
              <p>Map View</p>
              <img src={arrowIcon} alt="down-arrow" />
            </button>
          </Link>
        </div>
      </div>
      <div id="map" className={styles.Map}>
        <div className={styles.Map}>
          <div className={styles.Map_arrow}>
            <Link smooth to="/Board/#list">
              <p>Back to List</p>
              <img src={arrowIconUp} alt="down-arrow" />
            </Link>
          </div>
          <Map events={allEvents} />
        </div>
      </div>
    </div>
  );
};

export default Board;
