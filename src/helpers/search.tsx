import fetchJsonp from 'fetch-jsonp'
import { TrackType } from '../types/deezerData'
const { DZ } = window

type DispatchType = React.Dispatch<{ type: string; payload: any }>

export const searchArtistInfo = ({ id, artist }: TrackType, dispatch: DispatchType): void => {
  const ARTIST_API = `https://api.deezer.com/artist/${artist?.id}`
  searchArtist(dispatch, ARTIST_API)
  searchTopTracks(dispatch, ARTIST_API)
  searchArtistPlaylists(dispatch, ARTIST_API)
  searchAlbums(dispatch, ARTIST_API)
  searchSimilarArtists(dispatch, ARTIST_API)
  DZ?.ready(() => DZ?.player?.playTracks([id]))
}

const searchArtist = (dispatch: DispatchType, url: string) => fetch(url, dispatch, 'FIND_ARTIST')

const searchTopTracks = (dispatch: DispatchType, url: string) => fetch(`${url}/top`, dispatch, 'FIND_TOP_TRACKS')

const searchArtistPlaylists = (dispatch: DispatchType, url: string) =>
  fetch(`${url}/playlists`, dispatch, 'FIND_ARTIST_PLAYLISTS')

const searchAlbums = (dispatch: DispatchType, url: string) => fetch(`${url}/albums`, dispatch, 'FIND_ALBUMS')

const searchSimilarArtists = (dispatch: DispatchType, url: string) =>
  fetch(`${url}/related`, dispatch, 'FIND_SIMILAR_ARTISTS')

const fetch = (url: string, dispatch: DispatchType, type: string) =>
  fetchJsonp(`${url}?output=jsonp`)
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type,
        payload: data
      })
    )
