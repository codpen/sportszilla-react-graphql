import React from 'react';
import { render, screen } from '@testing-library/react';
import '../../../CreateEvent/AutoCompleteSport/node_modules/@testing-library/jest-dom/extend-expect';
import favouriteSports from './FavouriteSports';

describe('<favouriteSports />', () => {
  test('it should mount', () => {
    render(<FavouriteSports />);

    const favouriteSports = screen.getByTestId('favouriteSports');

    expect(favouriteSports).toBeInTheDocument();
  });
});
