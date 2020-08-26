import React, { useState, useEffect, useRef } from 'react';
import { Dropdown, Multiselect, Field, Menu, Item, Label } from '@zendeskgarden/react-dropdowns';
import { Tag } from '@zendeskgarden/react-tags';

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
import styles from './FavouriteSports.module.scss';

const FavouriteSports: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState([
    options[0],
    options[1],
    options[2],
    options[3],
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [matchingOptions, setMatchingOptions] = useState(options);

  useEffect(() => {
    setIsLoading(true);
  }, [inputValue]);

  const renderOptions = () => {
    if (isLoading) {
      return <Item disabled>Loading items...</Item>;
    }

    if (matchingOptions.length === 0) {
      return <Item disabled>No matches found</Item>;
    }

    return matchingOptions.map((option) => (
      <Item key={option} value={option}>
        <span>{option}</span>
      </Item>
    ));
  };

  return (
    <div className={styles.favouriteSports} data-testid="favouriteSports">
      favouriteSports Component
    </div>
  );
};

export default FavouriteSports;
