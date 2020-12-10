export type TrackStateType = {
  track: any
  loading?: boolean
  error?: null
}

export type TracksTracksActionType = {
  type: string
  payload: any
}

export const initialTracksTracksState: TrackStateType = {
  track: {},
  loading: false,
  error: null
}

const contactsReducer: (state: TrackStateType, action: TracksTracksActionType) => TrackStateType = (state, action) => {
  switch (action.type) {
    case 'CHANGE_TRACK':
      return action.payload.track.album
        ? { ...action.payload.track }
        : {
            ...action.payload.track,
            ...{ album: { cover_xl: action.payload.coverXl, cover_medium: action.payload.coverMedium } }
          }
    default:
      return state
  }
}

export default contactsReducer
