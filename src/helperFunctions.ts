import fetchJsonp from 'fetch-jsonp'
import { StateType } from './reducers'
import { AlbumType, ArtistType, PlaylistType, TrackType } from './types/deezerData'
const { DZ } = window

type DispatchType = React.Dispatch<{ type: string; payload: any }>

const randomTrack = (data: Array<TrackType>, previousTrack?: TrackType): TrackType => {
  let track: TrackType
  do {
    track = data[Math.floor(Math.random() * data.length)]
  } while (previousTrack !== undefined && data.length >= 1 && previousTrack.id === track.id)
  return track
}

export const randomFlowTrack = (state: StateType, dispatch: DispatchType) => {
  dispatch({ type: 'ALBUM', payload: undefined })
  dispatch({ type: 'PLAYLIST', payload: undefined })
  const track = randomTrack(state.flow?.data || [], state.track)
  console.log(state.flow?.data, track)
  if (track) {
    dispatch({ type: 'CHANGE_TRACK', payload: track })
  }
}

export const playPlaylist = (dispatch: DispatchType, data: PlaylistType) =>
  DZ?.player.playPlaylist(data.id, () => dispatch({ type: 'PLAYLIST', payload: data }))

export const playAlbum = (dispatch: DispatchType, data: AlbumType) =>
  DZ?.player.playAlbum(data.id, () => dispatch({ type: 'ALBUM', payload: data }))

export const playArtistRadio = (dispatch: DispatchType, data: ArtistType) =>
  DZ.player.playRadio(data.id, 'artist', () => dispatch({ type: 'ARTIST_RADIO', payload: data }))

export const playArtistTracks = (dispatch: DispatchType, data: ArtistType) =>
  fetchJsonp(`https://api.deezer.com/artist/${data.id}/top?limit=100&output=jsonp`)
    .then((resp) => resp.json())
    .then(({ data: tracks }) => {
      DZ.player.playTracks(tracks.map(({ id }) => id))
      dispatch({ type: 'ARTIST_TRACKS_LIST', payload: tracks })
      dispatch({ type: 'ARTIST', payload: data })
    })
