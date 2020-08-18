import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Apollo from './Apollo';

describe('<Apollo />', () => {
  test('it should mount', () => {
    render(<Apollo />);

    const apollo = screen.getByTestId('Apollo');

    expect(apollo).toBeInTheDocument();
  });
});
