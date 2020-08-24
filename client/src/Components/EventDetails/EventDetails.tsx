import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { EventData } from '../Board/Event';
import Loader from '../Loader/Loader';
import styles from './EventDetails.module.scss';

const GET_ONE_EVENT = gql`
  query GetOneEvent($id: Float!) {
    getOneEvent(ID: $id) {
      ID
      eventName
      timeStart
      timeEnd
      date
      location
      minParticipants
      maxParticipants
      indoor
      availableSpots
      description
      sportID
      userID
      creationDate
      updatedOn
      deletionDate
      participants
    }
  }
`;

const EventDetails: React.FC = () => {
  interface Response {
    getOneEvent: EventData;
  }
  interface Arguments {
    ID: number;
  }
  const { loading, data, error } = useQuery<Response, Arguments>(GET_ONE_EVENT);

  if (loading) return <Loader boxHeight={400} />;
  if (error) return <p>Oopsie: {error.message}</p>;
  if (!data) return <p>User not found</p>;

  return (
    <>
      {data && data.getOneEvent &&
        (
          <article className={styles.EventDetails} data-testid="EventDetails">
            Event Details
          </article>
        )
      }
    </>
  );
};

export default EventDetails;
