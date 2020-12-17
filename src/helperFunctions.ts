import fetchJsonp from 'fetch-jsonp'
import { searchArtistInfo } from './helpers/search'
import { StateType } from './reducers'
import { AlbumType, ArtistType, PlaylistType, TrackType } from './types/deezerData'

type DispatchType = React.Dispatch<{ type: string; payload: any }>

const randomTrack = (data: Array<TrackType>, previousTrack?: TrackType): TrackType => {
  let track: TrackType
  do {
    track = data[Math.floor(Math.random() * data.length)]
  } while (previousTrack !== undefined && data.length >= 1 && previousTrack.id === track.id)
  return track
}

export const random = (state: StateType, dispatch: DispatchType) => {
  const regex = /\/(artists|playlists|albums)\/(\d+)/
  const href = window.location.href.match(regex)
  if (href) {
    switch (href[1]) {
      case 'artists':
        changeArtistTrackList(state, dispatch, parseInt(href[2]))
        break
      case 'albums':
        changeAlbum(state, dispatch, parseInt(href[2]))
        break
      case 'playlists':
        changePlaylist(state, dispatch, parseInt(href[2]))
    }
  } else {
    state.album
      ? changeAlbum(state, dispatch, state.album.id)
      : state.playlist
      ? changePlaylist(state, dispatch, state.playlist.id)
      : state?.artist
      ? changeArtistTrackList(state, dispatch, state.artist.id)
      : state.flow
      ? randomFlowTrack(state, dispatch)
      : null
  }
}

export const randomFlowTrack = (state: StateType, dispatch: DispatchType) => {
  dispatch({ type: 'ALBUM', payload: undefined })
  dispatch({ type: 'PLAYLIST', payload: undefined })
  dispatch({ type: 'PREV_TRACK', payload: state.track })
  const track = randomTrack(state.flow?.data || [], state.track)
  if (track) {
    dispatch({ type: 'CHANGE_TRACK', payload: track })
    searchArtistInfo(track, dispatch)
  }
}

export const changePlaylist = (state: StateType, dispatch: DispatchType, id?: PlaylistType['id']) =>
  fetchJsonp(`https://api.deezer.com/playlist/${id}?output=jsonp`)
    .then((resp) => resp.json())
    .then((data) => {
      dispatch({ type: 'ALBUM', payload: undefined })
      dispatch({ type: 'PLAYLIST', payload: data })
      dispatch({ type: 'PREV_TRACK', payload: state.track })
      const newTrack = { ...randomTrack(data.tracks.data, state.track), playlist: data }
      dispatch({ type: 'CHANGE_TRACK', payload: newTrack })
      searchArtistInfo(newTrack, dispatch)
    })

export const changeAlbum = (state: StateType, dispatch: DispatchType, id?: AlbumType['id']) =>
  fetchJsonp(`https://api.deezer.com/album/${id}?output=jsonp`)
    .then((resp) => resp.json())
    .then((data) => {
      dispatch({ type: 'PLAYLIST', payload: undefined })
      dispatch({ type: 'ALBUM', payload: data })
      dispatch({ type: 'PREV_TRACK', payload: state.track })
      const newTrack = { ...randomTrack(data.tracks.data, state.track), album: data }
      dispatch({ type: 'CHANGE_TRACK', payload: newTrack })
      searchArtistInfo(newTrack, dispatch)
    })

export const changeArtistTrackList = (state: StateType, dispatch: DispatchType, id?: ArtistType['id']) =>
  fetchJsonp(`https://api.deezer.com/artist/${id}/top?limit=100&output=jsonp`)
    .then((resp) => resp.json())
    .then((data) => {
      dispatch({ type: 'ALBUM', payload: undefined })
      dispatch({ type: 'PLAYLIST', payload: undefined })
      dispatch({ type: 'ARTIST_TRACK_LIST', payload: data })
      dispatch({ type: 'PREV_TRACK', payload: state.track })
      const newTrack = randomTrack(data.data, state.track)
      dispatch({ type: 'CHANGE_TRACK', payload: newTrack })
      searchArtistInfo(newTrack, dispatch)
    })
