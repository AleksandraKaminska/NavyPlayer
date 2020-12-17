import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders deezer logo', () => {
  render(<App />)
  expect(screen.getByText(/Powered by Deezer/i)).toBeInTheDocument()
  const button = screen.getByTestId('deezer-logo')
  expect(button).toBeInTheDocument()
  expect(button).toHaveAttribute('href', 'https://deezer.com')
  const img = screen.getByAltText(/Deezer logo/i)
  expect(img).toBeInTheDocument()
})
