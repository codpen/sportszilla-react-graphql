import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Loader from './Loader';

describe('<Loader />', () => {
  test('it should mount', () => {
    render(<Loader />);

    const spinner = screen.getByTestId('Loader');

    expect(spinner).toBeInTheDocument();
  });
});
