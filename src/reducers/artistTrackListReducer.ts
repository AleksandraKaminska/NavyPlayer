import { TrackType } from '../types/deezerData'

export type ArtistTrackListActionType = {
  type: string
  payload: Array<TrackType>
}

const artistTrackListReducer: (state: Array<TrackType>, action: ArtistTrackListActionType) => Array<TrackType> = (
  state,
  action
) => {
  switch (action.type) {
    case 'ARTIST_TRACK_LIST':
      return action.payload
    default:
      return state
  }
}

export default artistTrackListReducer
