import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import autoCompleteInput from './autoCompleteInput';

describe('<autoCompleteInput />', () => {
  test('it should mount', () => {
    render(<autoCompleteInput />);

    const autoCompleteInput = screen.getByTestId('autoCompleteInput');

    expect(autoCompleteInput).toBeInTheDocument();
  });
});
