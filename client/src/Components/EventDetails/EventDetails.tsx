import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import moment from 'moment';
import { Label } from '@zendeskgarden/react-forms';
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

  if (loading) return <Loader boxHeight={400} />;
  if (error) return <p>Oopsie: {error.message}</p>;
  if (!data) return <p>User not found</p>;

  if (data && data.getOneEvent) {
    const spEvent = data.getOneEvent;
    const creator = spEvent.participants && spEvent.participants[0];
    return (
      <section className={styles.EventDetails} data-testid="EventDetails">
        <article className={styles.infoCard}>
          <div className={styles.creator}>
            <Avatar backgroundColor={PALETTE.grey[600]} size="extrasmall">
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

        </div>


        <div>
          <h2 className={styles.partTitle}>Participants</h2>
          <div className={styles.fields}>
            <Label>Minimum participants</Label>
            <p>{spEvent.minParticipants}</p>
          </div>
          <div className={styles.fields}>
            <Label>Maximum participants</Label>
            <p>{spEvent.maxParticipants}</p>
          </div>
          <div className={styles.fields}>
            <Label>Participants</Label>
            <p>{String(spEvent.participants)}</p>
          </div>
        </div>



        <div className={styles.fields}>
          <Label>Indoor</Label>
          <p>{spEvent.indoor?.toString()}</p>
        </div>

        <div className={styles.fields}>
          <Label>Available Spots</Label>
          <p>{spEvent.availableSpots}</p>
        </div>



        <div className={styles.fields}>
          <Label>Sport</Label>
          <p>{spEvent.sport?.sportName}</p>
        </div>



        <div className={styles.fields}>
          <Label>Description</Label>
          <p>{spEvent.description}</p>
        </div>
      </section>
    );
  }

  return <div></div>;
};

export default EventDetails;
