import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EventDetails from './EventDetails';

describe('<EventDetails />', () => {
  test('it should mount', () => {
    render(<EventDetails />);
    
    const eventDetails = screen.getByTestId('EventDetails');

    expect(eventDetails).toBeInTheDocument();
  });
});