import React from 'react';
import { render, screen } from '@testing-library/react';
import '../../../CreateEvent/AutoCompleteSport/node_modules/@testing-library/jest-dom/extend-expect';
import TableEvent from './TableEvent';

describe('<TableEvent />', () => {
  test('it should mount', () => {
    render(<TableEvent />);

    const tableEvent = screen.getByTestId('TableEvent');

    expect(tableEvent).toBeInTheDocument();
  });
});
