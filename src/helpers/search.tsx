import fetchJsonp from 'fetch-jsonp'
import { TrackType } from '../types/deezerData'
const { DZ } = window

type DispatchType = React.Dispatch<{ type: string; payload: any }>

export const searchApi: (value: string, type?: string, limit?: number) => Promise<any> = async (
  value,
  type = 'autocomplete',
  limit = 10
) => await (await fetchJsonp(`https://api.deezer.com/search/${type}?q=${value}&limit=${limit}&output=jsonp`)).json()

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

const searchTopTracks = (dispatch: DispatchType, url: string) => fetch(`${url}/top`, dispatch, 'ARTIST_TRACK_LIST')

const searchArtistPlaylists = (dispatch: DispatchType, url: string) =>
  fetch(`${url}/playlists`, dispatch, 'ARTIST_PLAYLISTS')

const searchAlbums = (dispatch: DispatchType, url: string) => fetch(`${url}/albums`, dispatch, 'ALBUMS')

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
