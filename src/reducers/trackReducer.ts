import { TrackType, CurrentTrackType } from '../types/deezerData'

export type TracksTracksActionType = {
  type: string
  payload: TrackType | CurrentTrackType
}

const trackReducer: (
  state: TrackType | CurrentTrackType,
  action: TracksTracksActionType
) => TrackType | CurrentTrackType = (state, action) => {
  switch (action.type) {
    case 'CHANGE_TRACK':
      return action.payload
    default:
      return state
  }
}

export default trackReducer
