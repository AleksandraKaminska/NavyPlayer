export type AlbumStateType = {
  album: any
  loading?: boolean
  error?: null
}

export type AlbumsTracksActionType = {
  type: string
  payload: any
}

export const initialAlbumsTracksState: AlbumStateType = {
  album: {},
  loading: false,
  error: null
}

const contactsReducer: (state: AlbumStateType, action: AlbumsTracksActionType) => AlbumStateType = (state, action) => {
  switch (action.type) {
    case 'FIND_ALBUM':
      return {
        ...state,
        album: action.payload
      }
    default:
      return state
  }
}

export default contactsReducer
