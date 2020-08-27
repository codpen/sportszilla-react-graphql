import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import Loader from '../Loader/Loader';
import Faker from 'faker';
import Moment from 'react-moment';
import { EventData } from '../Board/Event';
import ButtonGeneric from '../ButtonGeneric/ButtonGeneric';
import styles from './EventLogin.module.scss';
import { any } from 'prop-types';

type PropTypes = {
  event: EventData;
};

const UPDATE__EVENT = gql`
  mutation updateEvent($eventData: UpdateEvent!, $ID: Float!) {
    updateEvent(eventData: $eventData, ID: $ID) {
      ID
    }
  }
`;

interface Arguments {
  eventData: any;
  ID: number | undefined;
}

const EventLogin: React.FC<PropTypes> = ({ event }) => {
  const userID = JSON.parse(localStorage.getItem('userInformation') || '{}').ID;
  console.log(userID);

  const [updateEvent, { loading, error, data }] = useMutation<Response, Arguments>(UPDATE__EVENT);
  useEffect(() => {}, [updateEvent]);

  const history = useHistory();

  function handleJoin(ev: EventData) {
    if (userID) {
      const copyEvent: EventData = {};
      Object.keys(ev).forEach((key) => {
        if (key !== 'participants') copyEvent[key] = ev[key];
      });
      const participants: any[] = [...ev.participants!];
      const updatedParticipants = participants.map((event) => event.ID);
      updatedParticipants.push(userID);
      console.log(updatedParticipants);
      copyEvent.participants = updatedParticipants;
      const newObj = {
        eventName: ev.eventName,
        sportName: ev.sportName,
        time: ev.time,
        date: ev.date,
        indoor: ev.indoor,
        availableSpots: ev.availableSpots,
        location: ev.location,
        timeStart: ev.timeStart,
        timeEnd: ev.timeEnt,
        participants: updatedParticipants,
      };
      updateEvent({ variables: { eventData: newObj, ID: ev.ID } });
      history.go(0);
    }
    return;
  }

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

  const imageList = (list: any) => {
    const imgArr = [];
    for (let i = 0; i < event.participants!.length; i++) {
      imgArr.push(list[i]);
    }
    return imgArr;
  };

  if (loading) return <Loader />;
  if (error) return <p>Oopsie: {error.message}</p>;
  if (data) {
    console.log(data);
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Head}>
        <div className={styles.EventTitle}>
          <Link style={{ textDecoration: 'none', color: '#000000' }} to={`/event/${event.ID}`}>
            <h2 className={styles.Title}>{event.eventName}</h2>
          </Link>
          <div>
            <img src={require('../../Images/FormIcons/pin.svg')} alt="" />
            <p>{event.location}</p>
          </div>
        </div>
        <img src={require(`../../Images/SportIconsColor/${event.sport?.sportName}.svg`)} alt="" />
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
              {event.participants?.length} / {event.maxParticipants}
            </span>
          </h4>
          <div className={styles.EventBox_center_picContainer}>{imageList(randomList)}</div>
        </div>
        <div className={styles.EventBox_right}>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleJoin(event);
            }}
          >
            <ButtonGeneric
              buttonText="Join"
              buttonLink={userID ? '#' : '/user/signup/'}
            ></ButtonGeneric>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventLogin;
