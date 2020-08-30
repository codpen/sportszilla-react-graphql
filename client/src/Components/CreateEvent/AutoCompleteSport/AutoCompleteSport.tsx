import React, { useRef, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Item, Menu, Label, Field, Dropdown, Autocomplete } from '@zendeskgarden/react-dropdowns';
import { ReactComponent as SearchIcon } from '@zendeskgarden/svg-icons/src/16/search-stroke.svg';
import styles from './AutoCompleteSport.module.scss';
import { SportData } from '../../Sport/SportData';
import { Sport } from '../../Board/Event';

interface PropTypes {
  sportArray?: SportData[];
  setSport: Dispatch<SetStateAction<Sport | undefined>> | undefined;
}

const AutoCompleteSport: React.FC<PropTypes> = ({ sportArray: sportArray, setSport }) => {
  const [selectedItem, setSelectedItem] = useState(sportArray && sportArray[0].sportName);
  const [inputValue, setInputValue] = useState<string>('');
  const [matchingOptions, setMatchingOptions] = useState<any>(sportArray);

  useEffect(
    () =>
      setMatchingOptions(
        sportArray &&
          sportArray.filter((sport: SportData) => {
            if (sport.sportName) return sport.sportName.includes(inputValue);
          })
      ),
    [inputValue]
  );

  useEffect(() => {
    if (typeof selectedItem === 'string') {
      setSport!(sportArray?.find((sport) => sport.sportName === selectedItem));
    }
    console.log(selectedItem);
  }, [selectedItem]);

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
    { ID: 8, sportName: 'golf' },
    { ID: 9, sportName: 'tennis' },
    { ID: 10, sportName: 'basketball' },
    { ID: 11, sportName: 'football' },
    { ID: 12, sportName: 'badminton' },
    { ID: 13, sportName: 'volleyball' },
    { ID: 14, sportName: 'handball' },
    { ID: 15, sportName: 'skateboard' },
  ],
};

export default AutoCompleteSport;
