import { TrackType } from '../types/deezerData'

export type TrackActionType = {
  type: string
  payload: TrackType
}

const previousTracksReducer: (state: Array<TrackType>, action: TrackActionType) => Array<TrackType> = (
  state,
  action
) => {
  switch (action.type) {
    case 'PREV_TRACK':
      let newState = [...state, action.payload]
      if (state.length && action.payload?.id && state.slice(-1)[0]?.id === newState.slice(-1)[0]?.id) {
        newState = state.filter((e) => e?.id !== newState.slice(-1)[0]?.id)
      }
      return action.payload?.id ? newState : state
    default:
      return state
  }
}

export default previousTracksReducer
