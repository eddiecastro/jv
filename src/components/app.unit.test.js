import React from 'react';
import { render } from '@testing-library/react';
import App from './app.jsx';

test('renders title', () => {
  const { getByText } = render(<App />);
  const title = getByText(/hi/i);
  expect(title).toBeInTheDocument();
});
