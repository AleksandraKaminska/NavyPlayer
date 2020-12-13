import { AlbumType } from '../types/deezerData'

export type AlbumsTracksActionType = {
  type: string
  payload: AlbumType
}

const contactsReducer: (state: AlbumType, action: AlbumsTracksActionType) => AlbumType = (state, action) => {
  switch (action.type) {
    case 'ALBUM':
      return action.payload
    default:
      return state
  }
}

export default contactsReducer
