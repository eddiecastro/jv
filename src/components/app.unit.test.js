import React from 'react';
import { render } from '@testing-library/react';
import App from './app.jsx';

test('renders hi', () => {
  const { getByText } = render(<App />);
  const hi = getByText(/hi/i);
  expect(hi).toBeInTheDocument();
});
