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
import { useHistory } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { UserData } from '../User/UserData';
import { ReactComponent as StartIcon } from '@zendeskgarden/svg-icons/src/16/search-stroke.svg';
import AutoCompleteSport from './AutoCompleteSport/AutoCompleteSport';
import AutoCompleteAddress from './AutoCompleteAddress/AutoCompleteAddress';
import moment from 'moment';
import Loader from '../../Components/Loader/Loader';
import { EventData, Sport } from '../Board/Event';

const NEW_EVENT = gql`
  mutation NewEvent($eventData: NewSportEvent!) {
    newEvent(eventData: $eventData) {
      ID
      eventName
      location
      timeStart
      sportID
      sport {
        sportName
      }
      timeStart
      timeEnd
      participants {
        ID
      }
      latitude
      longitude
      maxParticipants
      minParticipants
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
    background: transparent;
    border-color: #eea551;
    color: #eea551;
  }
`;

interface FormMethod<E> {
  (event: E): void;
}

interface PropTypes {
  events: EventData[];
}

interface Arguments {
  eventData: Event;
}

const CreateEvent: React.FC<PropTypes> = ({ events }: PropTypes) => {
  const initialED: Event = {
    eventName: '',
    timeStart: `${moment().format('YYYY-MM-DD')} 16:00`,
    timeEnd: `${moment().format('YYYY-MM-DD')} 20:00`,
    latitude: 0,
    longitude: 0,
    accuracy: 30,
    location: '',
    minParticipants: 5,
    maxParticipants: 10,
    availableSpots: 10,
    indoor: false,
    sportID: 1,
    sport: 1,
    participants: [(JSON.parse(localStorage.getItem('userInformation') || '{}') || { ID: 0 }).ID],
  };
  const [date, setDate] = useState<undefined | Date>(undefined);
  const [eventData, setEventData] = useState<Event>(initialED);
  const [timeStart, setTimeStart] = useState<number>(64);
  const [timeEnd, setTimeEnd] = useState<number>(80);
  const [minParticipants, setMinParticipants] = useState<number>(5);
  const [availableSpots, setAvailableSpots] = useState<number>(10);
  const [sport, setSport] = useState<Sport | undefined>({ ID: 0, sportName: 'basketball' });
  const [createEvent, { loading, error, data }] = useMutation<Response, Arguments>(NEW_EVENT);
  const [address, setAddress] = React.useState('');
  const [coordinates, setCoordinates] = React.useState<any>({ lat: null, lng: null });
  const history = useHistory();

  const handleDate = (dateF: Date): void => {
    setDate(dateF);
    setEventData((eventData) => ({
      ...eventData,
      timeStart: `${moment(dateF).format('YYYY-MM-DD')} ${
        Math.floor(timeStart / 4) + ':' + (15 * (timeStart % 4) || '00')
      }`,
      timeEnd: `${moment(dateF).format('YYYY-MM-DD')} ${
        Math.floor(timeEnd / 4) + ':' + (15 * (timeEnd % 4) || '00')
      }`,
    }));
  };

  useEffect(() => {
    setEventData({
      ...eventData,
      location: address,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    });
  }, [address, coordinates]);

  useEffect(() => {
    setEventData({ ...eventData, sport: sport?.ID });
  }, [sport]);

  const onChangeTime = ({ minValue, maxValue }: any): void => {
    setTimeStart(minValue);
    setTimeEnd(maxValue);
    setEventData((eventData) => ({
      ...eventData,
      timeStart: `${moment().format('YYYY-MM-DD') && moment(eventData.date).format('YYYY-MM-DD')} ${
        Math.floor(minValue / 4) + ':' + (15 * (minValue % 4) || '00')
      }`,
      timeEnd: `${moment().format('YYYY-MM-DD') && moment(eventData.date).format('YYYY-MM-DD')} ${
        Math.floor(maxValue / 4) + ':' + (15 * (maxValue % 4) || '00')
      }`,
    }));
  };

  const onChangeParticipants = ({ minValue, maxValue }: any): void => {
    setMinParticipants(minValue);
    setAvailableSpots(maxValue);
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
    if (eventData.location && !(eventData.location?.length > 1)) {
      return null;
    }
    console.log(eventData);
    createEvent({ variables: { eventData } });
    return null;
  };

  if (loading) return <Loader />;
  if (error) return <p>Oopsie: {error.message}</p>;
  if (data) {
    console.log(data);
    history.push('/user/profile');
  }

  return (
    <div className={styles.CreateEvent} data-testid="CreateEvent">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit} className={styles.signUpForm}>
        <Field className={styles.Field}>
          <Label>Name of Event</Label>
          <Input name="eventName" value={eventData.eventName} onChange={handleChange} />
        </Field>
        <Field className={styles.Field}>
          <AutoCompleteSport setSport={setSport} />
        </Field>
        <Field className={styles.Field}>
          <Label>Date</Label>
          <Datepicker value={date} onChange={handleDate}>
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
          <AutoCompleteAddress
            address={address}
            setAddress={setAddress}
            setCoordinates={setCoordinates}
          />
        </Field>
        <Field className={styles.Field}>
          <MultiThumbRange
            minValue={minParticipants}
            maxValue={availableSpots}
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
              <Input name="availableSpots" value={availableSpots} disabled={true} />
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
  eventName?: string;
  sportName?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  date?: Date;
  indoor?: boolean;
  description?: string;
  organizer?: number;
  time?: string;
  timeStart?: string;
  timeEnd?: string;
  registeredParticipants?: number[];
  minParticipants?: number;
  maxParticipants?: number;
  availableSpots?: number;
  sportID?: number;
  sport?: number;
  participants?: number[];
};
