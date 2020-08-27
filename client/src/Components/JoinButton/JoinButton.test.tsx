import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JoinButton from './JoinButton';

describe('<JoinButton />', () => {
  test('it should mount', () => {
    render(<JoinButton />);
    
    const joinButton = screen.getByTestId('JoinButton');

    expect(joinButton).toBeInTheDocument();
  });
});