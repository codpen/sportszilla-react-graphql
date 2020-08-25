import React from 'react';
import { render, screen } from '@testing-library/react';
import '../CreateEvent/AutoCompleteSport/node_modules/@testing-library/jest-dom/extend-expect';
import EventLogin from './EventLogin';

describe('<EventLogin />', () => {
  test('it should mount', () => {
    render(<EventLogin />);

    const eventLogin = screen.getByTestId('EventLogin');

    expect(eventLogin).toBeInTheDocument();
  });
});
