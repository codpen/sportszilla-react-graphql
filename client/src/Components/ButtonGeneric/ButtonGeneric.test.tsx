import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ButtonGeneric from './ButtonGeneric';

describe('<ButtonGeneric />', () => {
  test('it should mount', () => {
    render(<ButtonGeneric />);
    
    const buttonGeneric = screen.getByTestId('ButtonGeneric');

    expect(buttonGeneric).toBeInTheDocument();
  });
});