import React from 'react';
import { render, screen } from '@testing-library/react';
import '../../CreateEvent/AutoCompleteSport/node_modules/@testing-library/jest-dom/extend-expect';
import Delete from './Delete';

describe('<Delete />', () => {
  test('it should mount', () => {
    render(<Delete />);

    const del = screen.getByTestId('Delete');

    expect(del).toBeInTheDocument();
  });
});
