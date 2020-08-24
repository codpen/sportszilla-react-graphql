import React, { useState, FormEvent, ChangeEvent } from 'react';
import styles from './CreateEvent.module.scss';
import { mediaQuery } from '@zendeskgarden/react-theming';
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
import { number } from 'prop-types';
import { ReactComponent as StartIcon } from '@zendeskgarden/svg-icons/src/16/search-stroke.svg';
import { ReactComponent as SearchIcon } from '@zendeskgarden/svg-icons/src/16/search-stroke.svg';

const NEW_EVENT = gql`
  mutation NewEvent($eventData: NewSportEvent!) {
    newEvent(eventData: $eventData) {
      Event {
        ID
        sportEventName
        sportName
        time
        date
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
    timeStart: '',
    timeEnd: '',
    location: '',
    minParticipants: 0,
    maxParticipants: 0,
  };

  const [eventData, setEventData] = useState<Event>(initialED);
  const [timeStart, setTimeStart] = useState<number>(64);
  const [timeEnd, setTimeEnd] = useState<number>(80);
  const [minParticipants, setMinParticipants] = useState<number>(5);
  const [maxParticipants, setMaxParticipants] = useState<number>(10);
  const [createEvent, { loading, error, data }] = useMutation<Response, Arguments>(NEW_EVENT);

  const handleDate = (date: Date): void => {
    setEventData((eventData) => ({
      ...eventData,
      date: date,
    }));
  };

  const onChangeTime = ({ minValue, maxValue }: any): void => {
    setTimeStart(minValue);
    setTimeEnd(maxValue);
  };

  const onChangeParticipants = ({ minValue, maxValue }: any): void => {
    setMinParticipants(minValue);
    setMaxParticipants(maxValue);
  };

  const handleChange: FormMethod<ChangeEvent<HTMLInputElement>> = (event) => {
    const { name, value } = event.target;
    setEventData((eventData) => ({ ...eventData, [name]: value }));
  };

  const handleSubmit: FormMethod<FormEvent<HTMLFormElement>> = (event) => {
    event.preventDefault();
    createEvent({ variables: { eventData } });
    return null;
  };

  const [selectedItem, setSelectedItem] = useState(options[0]);

  return (
    <div className={styles.CreateEvent} data-testid="CreateEvent">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit} className={styles.signUpForm}>
        <Field className={styles.Field}>
          <Label>Name of Event</Label>
          <Input name="sportEventName" value={eventData.sportEventName} onChange={handleChange} />
        </Field>
        <Field className={styles.Field}>
          <Label>Type of Sport</Label>
          <MediaInput start={<StartIcon />} />
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

const options = [
  'Asparagus',
  'Brussel sprouts',
  'Cauliflower',
  'Garlic',
  'Jerusalem artichoke',
  'Kale',
  'Lettuce',
  'Onion',
  'Mushroom',
  'Potato',
  'Radish',
  'Spinach',
  'Tomato',
  'Yam',
  'Zucchini',
];
