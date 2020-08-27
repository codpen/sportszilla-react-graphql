import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import moment from 'moment';
import { Avatar } from '@zendeskgarden/react-avatars';
import { PALETTE } from '@zendeskgarden/react-theming';
import { EventData } from '../Board/Event';
import Loader from '../Loader/Loader';
import calendarIcon from '../../Images/FormIcons/event_calendar.svg';
import pin from '../../Images/FormIcons/pin.svg';
import styles from './EventDetails.module.scss';

const GET_ONE_EVENT = gql`
  query GetOneEvent($ID: Float!) {
    getOneEvent(ID: $ID) {
      ID
      eventName
      timeStart
      timeEnd
      location
      minParticipants
      maxParticipants
      indoor
      availableSpots
      description
      sportID
      creationDate
      updatedOn
      deletionDate
      sport {
        sportName
      }
      participants {
        ID
        firstName
      }
    }
  }
`;

const EventDetails: React.FC = () => {
  const { ID } = useParams();
  interface Response {
    getOneEvent: EventData;
  }
  interface Arguments {
    ID: number;
  }
  const { loading, data, error } = useQuery<Response, Arguments>(GET_ONE_EVENT, {
    variables: { ID: Number(ID) },
  });

  if (loading) return <Loader />;
  if (error) return <p>Oopsie: {error.message}</p>;
  if (!data) return <p>User not found</p>;

  if (data && data.getOneEvent) {
    const spEvent = data.getOneEvent;
    const creator = spEvent.participants && spEvent.participants[0];
    const sportName = spEvent.sport && spEvent.sport.sportName;
    console.log(spEvent);
    console.log(spEvent.participants?.length);
    const avatars = spEvent.participants?.map((elm) => (
      <Avatar
        backgroundColor={PALETTE.yellow[400]}
        size="small"
        style={{ marginRight: '3px', marginBottom: '3px' }}
      >
        <Avatar.Text>{creator?.firstName[0]}</Avatar.Text>
      </Avatar>
    ));
    return (
      <section className={styles.EventDetails} data-testid="EventDetails">
        <article className={styles.infoCard}>
          <div className={styles.creator}>
            <Avatar backgroundColor={PALETTE.crimson[400]} size="large">
              <Avatar.Text>{creator?.firstName[0]}</Avatar.Text>
            </Avatar>
            <span style={{ marginLeft: '2vw' }}>{creator?.firstName}</span>
          </div>
          <div className={styles.eventDate}>
            <div className={styles.calendar}>
              <span style={{ fontSize: '20px', color: '#e70909' }}>
                {moment(spEvent.timeStart).format('MMM Do')}
              </span>
              <img style={{width: '30px', height: '30px'}} src={calendarIcon} alt="calendar icon" />
            </div>
            <div className={styles.fromTo}>
              <div>
                <span>{moment(spEvent.timeStart).format('LT')}</span>
              </div>
              <span>&nbsp;—&nbsp;</span>
              <div>
                <span>{moment(spEvent.timeEnd).format('LT')}</span>
              </div>
            </div>
          </div>
        </article>

        <div className={styles.ribbon}>
          <span className={styles.text}>{spEvent.eventName}</span>
        </div>

        <div className={styles.location}>
          <img style={{width: '20px', height: '20px'}} src={pin} alt="pin icon" />
          <span style={{ marginLeft: '1vw' }}>{spEvent.location}</span>
        </div>

        <div className={styles.sportType}>
          <img
            src={require(`../../Images/SportIcons/${sportName}.svg`)}
            className={styles.sportIcon}
            alt={sportName}
          />
          <span className={styles.sportName}>
            {sportName} <span className={styles.inOut}>[{spEvent.indoor ? 'indoor' : 'outdoor'}]</span>
          </span>
        </div>

        <div className={styles.participants}>
          <h2 className={styles.partTitle}>Participants</h2>
          <div className={styles.partiBox}>
            <p className={styles.spotsTitle}>Spots:</p>
            <div className={styles.spotsBox}>
              <div>
                <span className={styles.spots}>Left: </span>
                <span className={styles.avNumb}>{spEvent.availableSpots}</span>
              </div>
              <div>
                <span className={styles.spots}>Min: </span>
                <span className={styles.minMaxNumb}>{spEvent.minParticipants}</span>
              </div>
              <div>
                <span className={styles.spots}>Max: </span>
                <span className={styles.minMaxNumb}>{spEvent.maxParticipants}</span>
              </div>
            </div>
              <p>{String(spEvent.participants)}</p>
            <div className={styles.mates}>
              {avatars}
            </div>
          </div>
        </div>

        <div className={styles.descBox}>
          <p className={styles.description}>˝{spEvent.description}˝</p>
        </div>
      </section>
    );
  }

  return <div></div>;
};

export default EventDetails;
