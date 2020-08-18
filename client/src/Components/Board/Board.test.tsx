import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Board from './Board';

describe('<Board />', () => {
  test('it should mount', () => {
    render(<Board />);

    const board = screen.getByTestId('Board');

    expect(board).toBeInTheDocument();
  });
});
