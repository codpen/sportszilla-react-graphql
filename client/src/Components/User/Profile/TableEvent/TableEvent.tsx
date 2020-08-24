import React, { ReactElement } from 'react';
import styles from './TableEvent.module.scss';

import Sport from '../../../Sport/Sport';
import mockData from '../../../../mockData/data.json';

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
  events: SportObj[] | undefined;
}

const TableEvent: React.FC<PropTypes> = ({ tableName, events }: PropTypes): ReactElement => {
  const list =
    events &&
    events.map((event) => {
      return (
        <tr>
          <td>
            <Sport sport={{ id: event.id, name: event.sportName }} />
          </td>
          <td>{event.location}</td>
          <td>
            {event.date} {event.timeStart}
          </td>
          <td>
            {event.registeredParticipants.length}/{event.maxParticipants}
          </td>
        </tr>
      );
    });

  return (
    <div className={styles.TableEvent} data-testid="TableEvent">
      <table className={styles.table}>
        <tr>
          <th colSpan={3} className={styles.headTable}>
            {tableName}
          </th>
        </tr>
        {/* <tr>
          <th className={styles.sport}>Sport</th>
          <th className={styles.address}>Address</th>
          <th className={styles.date}>Date</th>
          <th className={styles.people}>People</th>
        </tr> */}
        {list}
      </table>
    </div>
  );
};

TableEvent.defaultProps = {
  tableName: 'Upcoming events',
  events: [
    {
      id: 10,
      sportName: 'basketball',
      date: '1.1.2021',
      timeStart: '10:40 am',
      maxParticipants: 10,
      minParticipants: 3,
      location: '277 Bedford Ave, Brooklyn, NY 11211',
      registeredParticipants: [3, 5, 6],
    },
    {
      id: 11,
      sportName: 'football',
      date: '1.1.2021',
      timeStart: '10:40 am',
      maxParticipants: 8,
      minParticipants: 3,
      location: '277 Bedford Ave, Brooklyn, NY 11211',
      registeredParticipants: [3, 5, 6, 7],
    },
  ],
};

export default TableEvent;
