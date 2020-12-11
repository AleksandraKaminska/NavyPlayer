import { TrackType } from '../types/deezerData'

export type TopTracksActionType = {
  type: string
  payload: Array<TrackType>
}

const topTracksReducer: (state: Array<TrackType>, action: TopTracksActionType) => Array<TrackType> = (
  state,
  action
) => {
  switch (action.type) {
    case 'FIND_TOP_TRACKS':
      return action.payload
    default:
      return state
  }
}

export default topTracksReducer
