import { PlaylistType } from '../types/deezerData'

export type PlaylistActionType = {
  type: string
  payload: PlaylistType
}

const contactsReducer: (state: PlaylistType, action: PlaylistActionType) => PlaylistType = (state, action) => {
  switch (action.type) {
    case 'PLAYLIST':
      return action.payload
    default:
      return state
  }
}

export default contactsReducer
