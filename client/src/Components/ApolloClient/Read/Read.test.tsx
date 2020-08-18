import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Read from './Read';

describe('<Apollo />', () => {
  test('it should mount', () => {
    render(<Read />);

    const apollo = screen.getByTestId('Apollo');

    expect(apollo).toBeInTheDocument();
  });
});
