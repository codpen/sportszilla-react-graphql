import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Autocomplete from './Autocomplete';

describe('<Autocomplete />', () => {
  test('it should mount', () => {
    render(<Autocomplete />);
    
    const autocomplete = screen.getByTestId('Autocomplete');

    expect(autocomplete).toBeInTheDocument();
  });
});