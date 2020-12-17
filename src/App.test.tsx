import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './App'

test('renders deezer logo', () => {
  render(<App />)
  expect(screen.getByText(/Powered by Deezer/i)).toBeInTheDocument()

  const link = screen.getByRole('link', { name: /deezer logo/i })
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('href', 'https://deezer.com')

  const img = screen.getByAltText(/Deezer logo/i)
  expect(img).toBeInTheDocument()
})
