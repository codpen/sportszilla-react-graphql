import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OktaAuth from './OktaAuth';

describe('<OktaAuth />', () => {
  test('it should mount', () => {
    render(<OktaAuth />);
    
    const oktaAuth = screen.getByTestId('OktaAuth');

    expect(oktaAuth).toBeInTheDocument();
  });
});