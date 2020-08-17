import React, { useState } from 'react';
import styles from './SportList.module.scss';
import Sport from '../Sport/Sport';
import Data from '../../mockData/data.json';

const SportList: React.FC = () => {
  type SportObj = {
    id: number;
    name: string;
  };
  const [sport, setSport] = useState<SportObj[]>(Data.sports);

  const list = sport.map((sp) => {
    return (
      <button>
        <Sport sport={sp} />
      </button>
    );
  });

  return (
    <div className={styles.SportList} data-testid="SportList">
      {list}
    </div>
  );
};

export default SportList;
