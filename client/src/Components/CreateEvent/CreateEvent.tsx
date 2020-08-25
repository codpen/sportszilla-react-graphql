import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import styles from './CreateEvent.module.scss';
import {
  Field,
  Label,
  Input,
  Message,
  MultiThumbRange,
  MediaInput,
} from '@zendeskgarden/react-forms';
import { Button } from '@zendeskgarden/react-buttons';
import { Datepicker } from '@zendeskgarden/react-datepickers';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';
import { UserData } from '../User/UserData';
import { ReactComponent as StartIcon } from '@zendeskgarden/svg-icons/src/16/search-stroke.svg';
import AutoCompleteInput from './autoCompleteInput/autoCompleteInput';

const NEW_EVENT = gql`
  mutation NewEvent($eventData: NewSportEvent!) {
    newEvent(eventData: $eventData) {
      Event {
        ID
        eventName
        sportName
        time
        date
        location
        minParticipants
        maxParticipants
        lat
        lng
      }
    }
  }
`;

// add creater, endTime,

const SButton = styled(Button)`
  margin-top: 3vh;
  font-size: 30px;
  border-color: #90755f;
  color: #90755f;
  width: 50%;
  &:hover {
    border-color: #ffffff;
    color: #ffffff;
  }
`;

interface FormMethod<E> {
  (event: E): void;
}

interface PropTypes {
  user: UserData | undefined;
}

interface Arguments {
  eventData: Event;
}

const CreateEvent: React.FC<PropTypes> = ({ user }: PropTypes) => {
  const initialED: Event = {
    sportEventName: '',
    sportName: '',
    date: undefined,
    time: '',
    timeStart: '16:00',
    timeEnd: '20:00',
    location: '',
    minParticipants: 5,
    maxParticipants: 10,
  };

  const [eventData, setEventData] = useState<Event>(initialED);
  const [timeStart, setTimeStart] = useState<number>(64);
  const [timeEnd, setTimeEnd] = useState<number>(80);
  const [minParticipants, setMinParticipants] = useState<number>(5);
  const [maxParticipants, setMaxParticipants] = useState<number>(10);
  const [sport, setSport] = useState<string>('');
  const [createEvent, { loading, error, data }] = useMutation<Response, Arguments>(NEW_EVENT);

  const handleDate = (date: Date): void => {
    setEventData((eventData) => ({
      ...eventData,
      date: date,
    }));
  };

  useEffect(() => {
    setEventData({ ...eventData, sportName: sport });
  }, [sport]);

  const onChangeTime = ({ minValue, maxValue }: any): void => {
    setTimeStart(minValue);
    setTimeEnd(maxValue);
    setEventData((eventData) => ({
      ...eventData,
      timeStart: Math.floor(minValue / 4) + ':' + (15 * (minValue % 4) || '00'),
      timeEnd: Math.floor(maxValue / 4) + ':' + (15 * (maxValue % 4) || '00'),
    }));
  };

  const onChangeParticipants = ({ minValue, maxValue }: any): void => {
    setMinParticipants(minValue);
    setMaxParticipants(maxValue);
    setEventData((eventData) => ({
      ...eventData,
      minParticipants: minValue,
      maxParticipants: maxValue,
    }));
  };

  const handleChange: FormMethod<ChangeEvent<HTMLInputElement>> = (event) => {
    const { name, value } = event.target;
    console.log(name);
    setEventData((eventData) => ({
      ...eventData,
      [name]: value,
    }));
  };

  const handleSubmit: FormMethod<FormEvent<HTMLFormElement>> = (event) => {
    event.preventDefault();
    console.log(eventData);
    // createEvent({ variables: { eventData } });
    return null;
  };

  return (
    <div className={styles.CreateEvent} data-testid="CreateEvent">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit} className={styles.signUpForm}>
        <Field className={styles.Field}>
          <Label>Name of Event</Label>
          <Input name="sportEventName" value={eventData.sportEventName} onChange={handleChange} />
        </Field>
        <Field className={styles.Field}>
          <AutoCompleteInput setSport={setSport} />
        </Field>
        <Field className={styles.Field}>
          <Label>Date</Label>
          <Datepicker value={eventData.date} onChange={handleDate}>
            <Input name="date" />
          </Datepicker>
        </Field>
        <Field className={styles.Field}>
          <MultiThumbRange
            minValue={timeStart}
            maxValue={timeEnd}
            onChange={onChangeTime}
            min={24}
            max={96}
          />
          <div className={styles.time}>
            <div>
              <Label>Time start</Label>
            </div>
            <div>
              <Input
                name="time"
                value={Math.floor(timeStart / 4) + ':' + (15 * (timeStart % 4) || '00')}
                disabled={true}
              />
            </div>

            <div>
              <Label>Time end</Label>
            </div>
            <div>
              <Input
                name="timeEnd"
                value={Math.floor(timeEnd / 4) + ':' + (15 * (timeEnd % 4) || '00')}
                disabled={true}
              />
            </div>
          </div>
        </Field>
        <Field className={styles.Field}>
          <Label>Location</Label>
          <MediaInput start={<StartIcon />} />
        </Field>
        <Field className={styles.Field}>
          <MultiThumbRange
            minValue={minParticipants}
            maxValue={maxParticipants}
            onChange={onChangeParticipants}
            min={2}
            max={30}
          />
          <div className={styles.time}>
            <div>
              <Label>Min Participants</Label>
            </div>
            <div>
              <Input name="minParticipants" value={minParticipants} disabled={true} />
            </div>

            <div>
              <Label>Max Participants</Label>
            </div>
            <div>
              <Input name="maxParticipants" value={maxParticipants} disabled={true} />
            </div>
          </div>
        </Field>
        <Field className={styles.Field}>
          <Label>Description</Label>
          <Input name="description" onChange={handleChange} />
        </Field>
        <SButton type="submit">Create Event</SButton>
      </form>
    </div>
  );
};
export default CreateEvent;

type Event = {
  ID?: number;
  sportEventName?: string;
  sportName: string;
  location?: string;
  date?: Date;
  description?: string;
  organizer?: number;
  time?: string;
  timeStart?: string;
  timeEnd?: string;
  registeredParticipants?: number[];
  minParticipants?: number;
  maxParticipants?: number;
};
