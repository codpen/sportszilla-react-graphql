import React, { useRef, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Item, Menu, Label, Field, Dropdown, Autocomplete } from '@zendeskgarden/react-dropdowns';
import { ReactComponent as SearchIcon } from '@zendeskgarden/svg-icons/src/16/search-stroke.svg';
import styles from './AutoCompleteSport.module.scss';
import { SportData } from '../../Sport/SportData';
import Sport from '../../Sport/Sport';

const options = [
  { ID: 0, sportName: 'football' },
  { ID: 1, sportName: 'baseball' },
  { ID: 2, sportName: 'bowling' },
  { ID: 3, sportName: 'badminton' },
];

interface PropTypes {
  sportArray?: SportData[];
  setSport: Dispatch<SetStateAction<string>> | undefined;
}

const AutoCompleteSport: React.FC<PropTypes> = ({ sportArray: sportArray, setSport }) => {
  const [selectedItem, setSelectedItem] = useState(sportArray && sportArray[0].sportName);
  const [inputValue, setInputValue] = useState<string>('');
  const [matchingOptions, setMatchingOptions] = useState<any>(sportArray);

  useEffect(
    () =>
      setMatchingOptions(
        options.filter((sport: SportData) => {
          if (sport.sportName) return sport.sportName.includes(inputValue);
        })
      ),
    [inputValue]
  );

  useEffect(() => {
    if (typeof selectedItem === 'string') setSport!(selectedItem);
  }, [selectedItem]);

  const sport = {
    id: 1,
    name: 'football',
  };

  return (
    <div className={styles.autoCompleteInput} data-testid="autoCompleteInput">
      <Dropdown
        inputValue={inputValue}
        selectedItem={selectedItem}
        onSelect={(item) => {
          setSelectedItem(item);
        }}
        onInputValueChange={(value) => setInputValue(value)}
        downshiftProps={{ defaultHighlightedIndex: 0 }}
      >
        <Field>
          <Label>Type of Sport</Label>
          <Autocomplete start={<SearchIcon />} style={{ height: '2.5rem' }}>
            <div className={styles.Ctn}>
              {selectedItem}
              <img
                className={styles.SportImage}
                src={require(`../../../Images/SportIcons/${selectedItem}.svg`)}
              />
            </div>
          </Autocomplete>
        </Field>
        <Menu>
          {matchingOptions.length ? (
            matchingOptions.map((option: SportData) => (
              <Item key={option.sportName} value={option.sportName}>
                <span>{option.sportName}</span>
              </Item>
            ))
          ) : (
            <Item disabled>No matches found</Item>
          )}
        </Menu>
      </Dropdown>
    </div>
  );
};

AutoCompleteSport.defaultProps = {
  sportArray: [
    { ID: 0, sportName: 'football' },
    { ID: 1, sportName: 'baseball' },
    { ID: 2, sportName: 'bowling' },
    { ID: 3, sportName: 'badminton' },
  ],
};

export default AutoCompleteSport;
