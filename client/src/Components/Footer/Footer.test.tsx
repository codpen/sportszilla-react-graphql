import React from 'react';
import { render, screen } from '@testing-library/react';
import '../CreateEvent/AutoCompleteSport/node_modules/@testing-library/jest-dom/extend-expect';
import Footer from './Footer';

describe('<Footer />', () => {
  test('it should mount', () => {
    render(<Footer />);

    const footer = screen.getByTestId('Footer');

    expect(footer).toBeInTheDocument();
  });
});
