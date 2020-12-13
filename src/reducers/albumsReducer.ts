import { AlbumType } from '../types/deezerData'

export type AlbumsActionType = {
  type: string
  payload: {
    data: Array<AlbumType>
    total: number
    next?: string
  }
}

const contactsReducer: (state: Array<AlbumType>, action: AlbumsActionType) => Array<AlbumType> = (state, action) => {
  switch (action.type) {
    case 'ALBUMS':
      return action.payload.data
    default:
      return state
  }
}

export default contactsReducer
