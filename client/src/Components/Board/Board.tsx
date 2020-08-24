import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useQuery, gql } from '@apollo/client';
import moment from 'moment';
import { EventData } from './Event';
import { EventBS } from './eventBS';
import styles from './Board.module.scss';
import EventLogin from '../EventLogin/EventLogin';
import Data from '../../mockData/data.json';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import { HashLink as Link } from 'react-router-hash-link';
import Map from '../Map/Map';

interface PropTypes {
  setEvents: Dispatch<SetStateAction<EventData[]>>;
  events: EventData[];
}

// const EVENTS = gql`
//   query {
//     getAllEvents {
//       ID
//       eventName
//       sportName
//       time
//       date
//       indoor
//       availableSpots
//     }
//   }
// `;

const Board: React.FC<PropTypes> = ({ setEvents, events }) => {
  interface Response {
    getAllEvents: EventData[];
  }

  // const { loading, data, error } = useQuery<Response>(EVENTS);

  const [event, allEvent] = useState<EventBS[]>(Data.events);

  const list = event.map((event: EventBS) => {
    return (
      <div key={`${event.ID} ${event.sportName}`}>
        <EventLogin event={event} />
      </div>
    );
  });

  const filterBySport = (sport: any) => {
    const filteredList = Data.events.filter((e) => {
      return e.sportName === sport;
    });
    allEvent([...filteredList]);
  };

  const filterByDate = (date: any) => {
    const filteredList = Data.events.filter((e) => {
      return moment(e.date).format('MMMM Do YYYY') === moment(date).format('MMMM Do YYYY');
    });
    console.log(filteredList);
    allEvent([...filteredList]);
  };

  const arrowIcon = require('../../Images/FormIcons/down-arrow.svg');
  const arrowIconUp = require('../../Images/FormIcons/up-arrow.svg');

  // if (loading) return <Loader boxHeight={400} />;
  // if (error) return <div>Oopsie: {error.message}</div>;
  // if (data && data.getAllEvents) {
  //   setEvents(data.getAllEvents);
  // }

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
          <Map event={event} />
        </div>
      </div>
    </div>
  );
};

export default Board;
