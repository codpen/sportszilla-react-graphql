import React, { ReactElement } from 'react';
import styles from './TableEvent.module.scss';
import ButtonGeneric from '../../../ButtonGeneric/ButtonGeneric';
import Sport from '../../../Sport/Sport';
import mockData from '../../../../mockData/data.json';
import { EventData } from '../../../Board/Event';
import moment from 'moment';

type SportObj = {
  id: number;
  sportName: string;
  date: string;
  timeStart: string;
  minParticipants: number;
  maxParticipants: number;
  registeredParticipants: number[];
  location: string;
};

interface PropTypes {
  tableName: string | undefined;
  events: EventData[] | undefined;
}

const TableEvent: React.FC<PropTypes> = ({ tableName, events }: PropTypes): ReactElement => {
  console.log(events);
  const list =
    events &&
    events.map((event) => {
      return (
        <tr>
          <td>
            <Sport sport={{ id: event.ID || 0, name: event.sport?.sportName || '' }} />
          </td>
          <td>
            {event.eventName} {event.location}
          </td>
          <td>{moment(event.timeStart).format('DD.MM HH:mm')}</td>
          <td>
            {1 && event.participants && event.participants.length}/{event.maxParticipants}
          </td>
        </tr>
      );
    });

  return (
    <div className={styles.TableEvent} data-testid="TableEvent">
      <table className={styles.table}>
        <tr>
          <th colSpan={4} className={styles.headTable}>
            <div className={styles.head}>
              {tableName}{' '}
              {tableName === 'Created Events' ? (
                <ButtonGeneric buttonText="ADD" buttonLink="/newevent/" />
              ) : (
                ''
              )}
            </div>
          </th>
        </tr>
        {list}
      </table>
    </div>
  );
};

TableEvent.defaultProps = {
  tableName: 'Upcoming events',
  events: [
    {
      ID: 10,
      sport: {
        sportName: 'basketball',
      },
      maxParticipants: 10,
      minParticipants: 3,
      location: '277 Bedford Ave, Brooklyn, NY 11211',
      participants: [3, 5, 6],
    },
    {
      ID: 11,
      sport: {
        sportName: 'football',
      },
      maxParticipants: 8,
      minParticipants: 3,
      location: '277 Bedford Ave, Brooklyn, NY 11211',
      participants: [3, 5, 6],
    },
  ],
};

export default TableEvent;
