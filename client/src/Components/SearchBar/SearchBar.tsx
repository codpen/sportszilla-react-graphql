import React from 'react';
import styles from './SearchBar.module.scss';
import { Field, Label, Input } from '@zendeskgarden/react-forms';
import FilterButton from '../FilterButton/FilterButton';
import { Datepicker } from '@zendeskgarden/react-datepickers';
import Data from '../../mockData/data.json';

const SearchBar: React.FC = () => {
  const calendarIcon = require('../../Images/FormIcons/calendar.svg');

  return (
    <div className={styles.SearchBar} data-testid="SearchBar">
      <Field className={styles.SearchBar_Field}>
        <img
          className={styles.SearchBar_Field_CalendarIcon}
          src={calendarIcon}
          alt="calendarIcon"
        />
        <Datepicker
          isCompact={true}
          value={new Date()}
          onChange={(selectedDate) => console.log(selectedDate)}
        >
          <Input />
        </Datepicker>
        <Field>
          <FilterButton />
        </Field>
      </Field>
    </div>
  );
};

export default SearchBar;
