import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Playlist from './Playlist'
import { changePlaylist } from '../../helperFunctions'
import { PlaylistType, UserType } from '../../types/deezerData'

jest.mock('../../helperFunctions')

const mockedChangePlaylist = changePlaylist as jest.Mocked<any>

const user: UserType = {
  id: 123,
  name: 'username',
  tracklist: 'tracklist-url',
  type: 'user'
}

const playlist: PlaylistType = {
  id: 1,
  checksum: 'checksum',
  creation_date: '2020',
  link: 'link-url',
  md5_image: 'md5-url',
  nb_tracks: 123,
  picture: 'picture-url',
  picture_big: 'picture-big-url',
  picture_medium: 'picture-medium-url',
  picture_small: 'picture-small-url',
  picture_xl: 'picture-xl-url',
  public: true,
  title: 'title',
  tracklist: 'tracklist-url',
  type: 'playlist',
  user
}

test('renders correctly', () => {
  render(<Playlist data={playlist} />, { wrapper: BrowserRouter })
  expect(screen.getByAltText(/title/i)).toBeInTheDocument()
  expect(screen.getByAltText(/title/i)).toHaveAttribute('src', 'picture-medium-url')
  expect(screen.getByText(/title/i)).toBeInTheDocument()
  expect(screen.getByText(/123 tracks/i)).toBeInTheDocument()
})

test('calls change playlist function on click', () => {
  render(<Playlist data={playlist} />, { wrapper: BrowserRouter })
  fireEvent.click(screen.getAllByRole('img')[1])
  expect(mockedChangePlaylist).toBeCalled()
})

test('does not render if data props not passed', () => {
  render(<Playlist />, { wrapper: BrowserRouter })
  expect(screen.queryByAltText(/title/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/title/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/123 tracks/i)).not.toBeInTheDocument()
})
