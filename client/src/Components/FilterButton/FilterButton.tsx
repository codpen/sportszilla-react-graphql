import React, { useState } from 'react';
import styles from './FilterButton.module.scss';
import { Item, Menu, Dropdown, Trigger } from '@zendeskgarden/react-dropdowns';
import Data from '../../mockData/data.json';
import Sport from '../Sport/Sport';

const FilterButton: React.FC = () => {
  const filterIcon = require('../../Images/FormIcons/filter.svg');

  type SportObj = {
    id: number;
    name: string;
  };
  const [sport, setSport] = useState<SportObj[]>(Data.sports);

  const list = sport.map((sp) => {
    return (
      <Item value={sp.name}>
        <Sport sport={sp} />
      </Item>
    );
  });

  return (
    <div className={styles.FilterButton}>
      <Dropdown onSelect={(value) => console.log(`Selected: ${value}`)}>
        <Trigger>
          <button>
            <img src={filterIcon} alt="filterIcon" />
          </button>
        </Trigger>
        <Menu placement="end">{list}</Menu>
      </Dropdown>
    </div>
  );
};

export default FilterButton;
