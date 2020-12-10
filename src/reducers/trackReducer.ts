import { TrackType } from '../types/deezerData'

export type TracksTracksActionType = {
  type: string
  payload: TrackType
}

const contactsReducer: (state: TrackType, action: TracksTracksActionType) => TrackType = (state, action) => {
  console.log(action)
  switch (action.type) {
    case 'CHANGE_TRACK':
      return action.payload
    // return action.payload.album
    // ? { ...action.payload }
    // : {
    //     ...action.payload,
    //     ...{ album: { cover_xl: action.payload.coverXl, cover_medium: action.payload.coverMedium } }
    //   }
    default:
      return state
  }
}

export default contactsReducer
