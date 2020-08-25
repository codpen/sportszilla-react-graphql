import React from 'react';
import { render, screen } from '@testing-library/react';
import '../../CreateEvent/AutoCompleteSport/node_modules/@testing-library/jest-dom/extend-expect';
import Create from './Create';

describe('<Create />', () => {
  test('it should mount', () => {
    render(<Create />);

    const create = screen.getByTestId('Create');

    expect(create).toBeInTheDocument();
  });
});
