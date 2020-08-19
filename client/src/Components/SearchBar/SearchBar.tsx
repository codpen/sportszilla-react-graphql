import React from 'react';
import styles from './SearchBar.module.scss';
import { Field, Label, Input } from '@zendeskgarden/react-forms';
import { Datepicker } from '@zendeskgarden/react-datepickers';

const SearchBar: React.FC = () => (
  <div className={styles.SearchBar} data-testid="SearchBar">
    <Field className={styles.SearchBar_Field}>
      <p className={styles.SearchBar_Field_Label}>Date:</p>
      <Datepicker
        isCompact={true}
        value={new Date()}
        onChange={(selectedDate) => console.log(selectedDate)}
      >
        <Input />
      </Datepicker>
    </Field>
  </div>
);

export default SearchBar;
