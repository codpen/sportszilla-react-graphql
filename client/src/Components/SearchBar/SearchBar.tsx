import React from 'react';
import styles from './SearchBar.module.scss';
import { Field, Label, Input } from '@zendeskgarden/react-forms';
import FilterButton from '../FilterButton/FilterButton';
import { Datepicker } from '@zendeskgarden/react-datepickers';

const SearchBar: React.FC = () => {
  const calendarIcon = require('../../Images/FormIcons/calendar.svg');

  return (
    <div className={styles.SearchBar} data-testid="SearchBar">
      <img className={styles.SearchBar_Field_CalendarIcon} src={calendarIcon} alt="calendarIcon" />
      <Field className={styles.SearchBar_Field}>
        <Datepicker
          isCompact={true}
          value={new Date()}
          onChange={(selectedDate) => console.log(selectedDate)}
        >
          <Input />
        </Datepicker>
        <FilterButton />
      </Field>
    </div>
  );
};

export default SearchBar;
