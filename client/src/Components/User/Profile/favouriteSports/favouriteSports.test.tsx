import React from './node_modules/react';
import { render, screen } from './node_modules/@testing-library/react';
import '../../../CreateEvent/AutoCompleteSport/node_modules/@testing-library/jest-dom/extend-expect';
import favouriteSports from './favouriteSports';

describe('<favouriteSports />', () => {
  test('it should mount', () => {
    render(<FavouriteSports />);

    const favouriteSports = screen.getByTestId('favouriteSports');

    expect(favouriteSports).toBeInTheDocument();
  });
});
