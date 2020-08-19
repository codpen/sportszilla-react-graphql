import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SportList from './SportList';

describe('<SportList />', () => {
  test('it should mount', () => {
    render(<SportList />);

    const sportList = screen.getByTestId('SportList');

    expect(sportList).toBeInTheDocument();
  });
});
