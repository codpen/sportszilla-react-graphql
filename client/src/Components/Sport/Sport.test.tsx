import React from 'react';
import { render, screen } from '@testing-library/react';
import '../CreateEvent/AutoCompleteSport/node_modules/@testing-library/jest-dom/extend-expect';
import Sport from './Sport';

describe('<Sport />', () => {
  test('it should mount', () => {
    render(<Sport />);

    const sport = screen.getByTestId('Sport');

    expect(sport).toBeInTheDocument();
  });
});
