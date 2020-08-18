import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sport from './Sport';

describe('<Sport />', () => {
  test('it should mount', () => {
    render(<Sport />);
    
    const sport = screen.getByTestId('Sport');

    expect(sport).toBeInTheDocument();
  });
});