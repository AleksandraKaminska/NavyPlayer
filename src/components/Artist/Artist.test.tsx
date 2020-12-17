import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Artist from './Artist'
import { changeArtistTrackList } from '../../helperFunctions'
import { ArtistType } from '../../types/deezerData'

jest.mock('../../helperFunctions')

const mockedChangeArtistTrackList = changeArtistTrackList as jest.Mocked<any>

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
test("calls change artist's track list function on click", () => {
  render(<Artist data={artist} />, { wrapper: BrowserRouter })
  fireEvent.click(screen.getByTestId('artist'))
  expect(mockedChangeArtistTrackList).toBeCalled()
})

test('does not render if data props not passed', () => {
  render(<Artist />, { wrapper: BrowserRouter })
  expect(screen.queryByAltText(/name/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/name/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/123 Fans/i)).not.toBeInTheDocument()
})
