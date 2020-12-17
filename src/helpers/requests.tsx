import fetchJsonp from 'fetch-jsonp'
import { ArtistType } from '../types/deezerData'

type DispatchType = React.Dispatch<{ type: string; payload: any }>

export const ARTIST_API = 'https://api.deezer.com/artist/'

export const searchApi: (value?: string, type?: string, limit?: number) => Promise<any> = async (
  value,
  type = 'autocomplete',
  limit = 10
) => await (await fetchJsonp(`https://api.deezer.com/search/${type}?q=${value}&limit=${limit}&output=jsonp`)).json()

export const fetchAlbum: (id: number) => Promise<any> = async (id) =>
  await (await fetchJsonp(`https://api.deezer.com/album/${id}?output=jsonp`)).json()

export const searchArtistInfo = (id: ArtistType['id'], dispatch: DispatchType): void => {
  searchArtist(dispatch, id)
  searchTopTracks(dispatch, id)
  searchArtistPlaylists(dispatch, id)
  searchAlbums(dispatch, id)
  searchSimilarArtists(dispatch, id)
}

export const searchArtist = (dispatch: DispatchType, id: ArtistType['id']) =>
  fetchArtist(id.toString(), dispatch, 'ARTIST')

const searchTopTracks = (dispatch: DispatchType, id: ArtistType['id']) =>
  fetchArtist(`${id}/top`, dispatch, 'ARTIST_TRACKS_LIST', 100)

export const searchArtistPlaylists = (dispatch: DispatchType, id: ArtistType['id']) =>
  fetchArtist(`${id}/playlists`, dispatch, 'ARTIST_PLAYLISTS', 100)

export const searchAlbums = (dispatch: DispatchType, id: ArtistType['id']) =>
  fetchArtist(`${id}/albums`, dispatch, 'ALBUMS', 100)

export const searchSimilarArtists = (dispatch: DispatchType, id: ArtistType['id']) =>
  fetchArtist(`${id}/related`, dispatch, 'FIND_SIMILAR_ARTISTS')

const fetchArtist = (url: string, dispatch: DispatchType, type: string, limit?: number) =>
  fetchJsonp(`${ARTIST_API}${url}?output=jsonp${limit ? '&limit=' + limit : ''}`)
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type,
        payload: data
      })
    )
