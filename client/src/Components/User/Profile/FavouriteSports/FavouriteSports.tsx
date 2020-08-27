import React, { useState } from 'react';
import { Dropdown, Multiselect, Field, Menu, Item, Label } from '@zendeskgarden/react-dropdowns';
import { Tag } from '@zendeskgarden/react-tags';
import Sport from '../../../Sport/Sport';

import styles from './FavouriteSports.module.scss';
import { string } from 'prop-types';
import { useQuery, useLazyQuery, gql } from '@apollo/client';

const EVENTS = gql`
  query {
    getAllEvents {
      ID
      eventName
      sport {
        sportName
      }
      sportID
      timeStart
      timeEnd
      location
      longitude
      latitude
      minParticipants
      maxParticipants
      participants {
        ID
      }
    }
  }
`;

const options = ['football', 'badminton', 'basketball', 'baseball', 'tennis', 'golf', 'baseball'];

interface PropTypes {
  sports?: number[] | undefined;
}

const FavouriteSports: React.FC<PropTypes> = ({ sports }) => {
  const [selectedItems, setSelectedItems] = useState([
    options[0],
    options[1],
    options[2],
    options[3],
  ]);
  const [inputValue, setInputValue] = useState('');

  const renderOptions = () => {
    return options.map((option) => (
      <Item key={option} value={option}>
        <span>{option}</span>
      </Item>
    ));
  };

  return (
    <div className={styles.favouriteSports} data-testid="favouriteSports">
      <Dropdown
        inputValue={inputValue}
        selectedItems={selectedItems}
        onSelect={(items) => setSelectedItems(items)}
        downshiftProps={{ defaultHighlightedIndex: 0 }}
        onStateChange={(changes) => {
          if (Object.prototype.hasOwnProperty.call(changes, 'inputValue')) {
            setInputValue((changes as any).inputValue);
          }
        }}
      >
        <Field style={{ width: '100%', backgroundColor: 'transparent' }}>
          <Multiselect
            style={{ width: '100%', backgroundColor: 'transparent', border: 'none' }}
            renderItem={({ value, removeValue }: any) => {
              return (
                <Tag style={{ color: 'white', height: '40px', backgroundColor: 'transparent' }}>
                  <Sport sport={{ id: 1, name: value }} />
                  <Tag.Close style={{ height: '10px' }} onClick={() => removeValue()} />
                </Tag>
              );
            }}
          />
        </Field>
        <Menu>{renderOptions()}</Menu>
      </Dropdown>
    </div>
  );
};

export default FavouriteSports;
