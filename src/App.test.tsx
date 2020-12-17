import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders deezer logo', () => {
  render(<App />)
  const deezerText = screen.getByText(/Powered by Deezer/i)
  expect(deezerText).toBeInTheDocument()
})
