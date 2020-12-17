import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Artist from './Artist'
import { AlbumType, ArtistType } from '../../types/deezerData'

const artist: ArtistType = {
  id: 1,
  link: 'link-url',
  name: 'name',
  nb_album: 100,
  nb_fan: 123,
  picture: 'picture-url',
  picture_big: 'picture-big-url',
  picture_medium: 'picture-medium-url',
  picture_small: 'picture-small-url',
  picture_xl: 'picture-xl-url',
  radio: true,
  tracklist: 'tracklist-url',
  type: 'artist'
}

test('renders correctly', () => {
  render(<Artist data={artist} />, { wrapper: BrowserRouter })
  expect(screen.getByAltText(/name/i)).toBeInTheDocument()
  expect(screen.getByAltText(/name/i)).toHaveAttribute('src', 'picture-medium-url')
  expect(screen.getByText(/name/i)).toBeInTheDocument()
  expect(screen.getByText(/123 Fans/i)).toBeInTheDocument()
})

test('does not render if data props not passed', () => {
  render(<Artist />, { wrapper: BrowserRouter })
  expect(screen.queryByAltText(/name/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/name/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/123 Fans/i)).not.toBeInTheDocument()
})
