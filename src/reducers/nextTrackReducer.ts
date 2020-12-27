import { TrackType } from '../types/deezerData'

export type TrackActionType = {
  type: string
  payload: TrackType
}

const nextTracksReducer: (state: TrackType, action: TrackActionType) => TrackType = (state, action) => {
  switch (action.type) {
    case 'NEXT_TRACK':
      return action.payload
    default:
      return state
  }
}

export default nextTracksReducer
