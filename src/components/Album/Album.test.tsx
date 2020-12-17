import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Album from './Album'
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

const album: AlbumType = {
  id: 1,
  cover: 'cover-url',
  cover_big: 'cover-big-url',
  cover_medium: 'cover-medium-url',
  cover_small: 'cover-small-url',
  cover_xl: 'cover-xl-url',
  explicit_lyrics: false,
  fans: 123,
  genre_id: 1,
  link: 'link-url',
  md5_image: 'md5-url',
  record_type: 'mp3',
  release_date: '2020',
  title: 'album title',
  tracklist: 'tracklist-url',
  type: 'album',
  artist
}

test('renders correctly', () => {
  render(<Album data={album} />, { wrapper: BrowserRouter })
  expect(screen.getByAltText(/album title/i)).toBeInTheDocument()
  expect(screen.getByAltText(/album title/i)).toHaveAttribute('src', 'cover-medium-url')
  expect(screen.getByText(/album title/i)).toBeInTheDocument()
  expect(screen.getByText(/name/i)).toBeInTheDocument()
})

test('does not render if data props not passed', () => {
  render(<Album />, { wrapper: BrowserRouter })
  expect(screen.queryByAltText(/album title/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/album title/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/name/i)).not.toBeInTheDocument()
})
