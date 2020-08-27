import React, { useState } from 'react';
import { Dropdown, Multiselect, Field, Menu, Item, Label } from '@zendeskgarden/react-dropdowns';
import { Tag } from '@zendeskgarden/react-tags';
import styles from './FavouriteSports.module.scss';
import Sport from '../../../Sport/Sport';

const options = [
  'football',
  'badminton',
  'basketball',
  'baseball',
  'Jerusalem artichoke',
  'Kale',
  'Lettuce',
  'Onion',
  'Mushroom',
  'Potato',
  'Radish',
  'Spinach',
  'Tomato',
  'Yam',
  'Zucchini',
];

const FavouriteSports: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState([
    options[0],
    options[1],
    options[2],
    options[3],
  ]);
  const [inputValue, setInputValue] = useState('');

  console.log(selectedItems);

  const renderOptions = () => {
    return selectedItems.map((option) => (
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
              console.log(value);
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
