import { searchArtistInfo } from './helpers/search'
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
    searchArtistInfo(track, dispatch)
  }
}

export const playPlaylist = (dispatch: DispatchType, data: PlaylistType) => {
  DZ?.player.playPlaylist(data.id, (response) => console.log(response))
  const track = DZ.player.getCurrentTrack()
  dispatch({ type: 'CHANGE_TRACK', payload: track })
  dispatch({ type: 'PLAYLIST', payload: data })
  console.log(data, track, DZ.player.getTrackList(), DZ.player.getCurrentIndex())
}

export const playAlbum = (dispatch: DispatchType, data: AlbumType) => {
  DZ?.player.playAlbum(data.id, (response) => console.log(response))
  const track = DZ.player.getCurrentTrack()
  dispatch({ type: 'CHANGE_TRACK', payload: track })
  dispatch({ type: 'ALBUM', payload: data })
  console.log(data, track, DZ.player.getTrackList(), DZ.player.getCurrentIndex())
}

export const playArtistRadio = (dispatch: DispatchType, data: ArtistType) => {
  DZ.player.playRadio(data.id, 'artist', (response) => console.log(response))
  const track = DZ.player.getCurrentTrack()
  dispatch({ type: 'CHANGE_TRACK', payload: track })
  dispatch({ type: 'ARTIST_RADIO', payload: data })
  console.log(data, track, DZ.player.getTrackList(), DZ.player.getCurrentIndex())
  // searchArtistInfo(track, dispatch)
}
