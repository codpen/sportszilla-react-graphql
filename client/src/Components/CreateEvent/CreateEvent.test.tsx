import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateEvent from './CreateEvent';

describe('<CreateEvent />', () => {
  test('it should mount', () => {
    render(<CreateEvent />);
    
    const createEvent = screen.getByTestId('CreateEvent');

    expect(createEvent).toBeInTheDocument();
  });
});