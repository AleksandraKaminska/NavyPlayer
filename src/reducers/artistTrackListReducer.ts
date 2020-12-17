import { TrackType } from '../types/deezerData'

export type ArtistTrackListActionType = {
  type: string
  payload: ArtistTrackListStateType
}

export type ArtistTrackListStateType = {
  data: Array<TrackType>
  total: number
}

const artistTrackListReducer: (
  state: ArtistTrackListStateType,
  action: ArtistTrackListActionType
) => ArtistTrackListStateType = (state, action) => {
  switch (action.type) {
    case 'ARTIST_TRACKS_LIST':
      return action.payload
    default:
      return state
  }
}

export default artistTrackListReducer
