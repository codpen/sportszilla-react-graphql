import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Delete from './Delete';

describe('<Delete />', () => {
  test('it should mount', () => {
    render(<Delete />);
    
    const delete = screen.getByTestId('Delete');

    expect(delete).toBeInTheDocument();
  });
});