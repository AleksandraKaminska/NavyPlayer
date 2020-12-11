import { ArtistType } from '../types/deezerData'

export type ArtistActionType = {
  type: string
  payload: ArtistType
}

const contactsReducer: (state: ArtistType, action: ArtistActionType) => ArtistType = (state, action) => {
  switch (action.type) {
    case 'FIND_ARTIST':
      return action.payload
    default:
      return state
  }
}

export default contactsReducer
