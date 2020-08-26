import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, Multiselect, Field, Menu, Item, Label } from '@zendeskgarden/react-dropdowns';
import { Tag } from '@zendeskgarden/react-tags';
import styles from './favouriteSports.module.scss';

const options = [
  'Asparagus',
  'Brussel sprouts',
  'Cauliflower',
  'Garlic',
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
  const [selectedItems, setSelectedItems] = useState(['Test', options[1], options[2], options[3]]);
  const [inputValue, setInputValue] = useState('');
  const [matchingOptions, setMatchingOptions] = useState(options);

  const renderOptions = () => {
    return matchingOptions.map((option) => (
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
        <Field>
          <Label>Vegetables</Label>
          <Multiselect
            renderItem={({ value, removeValue }: any) => (
              <Tag>
                <span>{value}</span>
                <Tag.Close onClick={() => removeValue()} />
              </Tag>
            )}
          />
        </Field>
        <Menu>{renderOptions()}</Menu>
      </Dropdown>
    </div>
  );
};

export default FavouriteSports;
