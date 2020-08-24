import React, { useState } from 'react';
import styles from './SearchBar.module.scss';
import { Field, Label, Input } from '@zendeskgarden/react-forms';
import FilterButton from '../FilterButton/FilterButton';
import { Datepicker } from '@zendeskgarden/react-datepickers';

interface PropTypes {
  filterBySport: any;
  filterByDate: any;
}

const SearchBar: React.FC<PropTypes> = ({ filterBySport, filterByDate }) => {
  const calendarIcon = require('../../Images/FormIcons/calendar.svg');

  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className={styles.SearchBar} data-testid="SearchBar">
      <img className={styles.SearchBar_Field_CalendarIcon} src={calendarIcon} alt="calendarIcon" />
      <Field className={styles.SearchBar_Field}>
        <Datepicker
          isCompact={true}
          value={date}
          onChange={(selectedDate) => {
            filterByDate(selectedDate);
            setDate(selectedDate);
          }}
        >
          <Input />
        </Datepicker>
        <FilterButton filterBySport={filterBySport} />
      </Field>
    </div>
  );
};

export default SearchBar;
