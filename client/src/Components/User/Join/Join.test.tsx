import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Join from './Join';

describe('<Join />', () => {
  test('it should mount', () => {
    render(<Join />);
    
    const join = screen.getByTestId('Join');

    expect(join).toBeInTheDocument();
  });
});