import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Field, Label, Input, Message } from '@zendeskgarden/react-forms';
import { EventData } from '../Board/Event';
import Loader from '../Loader/Loader';
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
  const { loading, data, error } = useQuery<Response, Arguments>(GET_ONE_EVENT, { variables: { ID: Number(ID) } });

  if (loading) return <Loader boxHeight={400} />;
  if (error) return <p>Oopsie: {error.message}</p>;
  if (!data) return <p>User not found</p>;

  if (data && data.getOneEvent) {
    const event = data.getOneEvent;
    const creator = event.participants && event.participants[0];
    console.log(event);
    console.log(typeof creator, creator);
    return (
      <form className={styles.EventDetails} data-testid="EventDetails">
        <Field>
          <Label >Event title</Label>
          <h3 style={{ fontSize: '16px', margin: 0 }}>{event.eventName}</h3>
        </Field>

        <Field className={styles.fields}>
          <Label className={styles.labels}>Creator</Label>
          <p>{creator?.firstName}</p>
        </Field>

        <Field className={styles.fields}>
          <Label>Time start</Label>
          <p>{event.timeStart}</p>
        </Field>

        <Field className={styles.fields}>
          <Label>Time end</Label>
          <p>{event.timeEnd}</p>
        </Field>

        <Field className={styles.fields}>
          <Message>Correct this</Message>
          <Label>Date</Label>
          <p>{event.timeStart}</p>
        </Field>

        <Field className={styles.fields}>
          <Label>Location</Label>
          <p>{event.location}</p>
        </Field>

        <Field className={styles.fields}>
          <Label>Minimum participants</Label>
          <p>{event.minParticipants}</p>
        </Field>

        <Field className={styles.fields}>
          <Label>Maximum participants</Label>
          <p>{event.maxParticipants}</p>
        </Field>

        <Field className={styles.fields}>
          <Label>Indoor</Label>
          <p>{event.indoor?.toString()}</p>
        </Field>

        <Field className={styles.fields}>
          <Label>Available Spots</Label>
          <p>{event.availableSpots}</p>
        </Field>

        <Field className={styles.fields}>
          <Label>Description</Label>
          <p>{event.description}</p>
        </Field>

        <Field className={styles.fields}>
          <Label>Sport</Label>
          <p>{event.sport?.sportName}</p>
        </Field>

        <Field className={styles.fields}>
          <Label>Participants</Label>
          <p>{String(event.participants)}</p>
        </Field>
      </form>
    )
  }

  return <div></div>;

};

export default EventDetails;
