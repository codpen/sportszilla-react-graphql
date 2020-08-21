import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FilterButton from './FilterButton';

describe('<FilterButton />', () => {
  test('it should mount', () => {
    render(<FilterButton />);

    const filterButton = screen.getByTestId('FilterButton');

    expect(filterButton).toBeInTheDocument();
  });
});
