import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EventList from './EventList';

describe('<EventList />', () => {
  test('it should mount', () => {
    render(<EventList />);
    
    const eventList = screen.getByTestId('EventList');

    expect(eventList).toBeInTheDocument();
  });
});