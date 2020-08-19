import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DropMenu from './DropMenu';

describe('<DropMenu />', () => {
  test('it should mount', () => {
    render(<DropMenu />);
    
    const dropMenu = screen.getByTestId('DropMenu');

    expect(dropMenu).toBeInTheDocument();
  });
});