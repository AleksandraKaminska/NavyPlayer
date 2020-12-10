export type AlbumsStateType = {
  albums: Array<any>
  loading?: boolean
  error?: null
}

export type AlbumsActionType = {
  type: string
  payload: any
}

export const initialAlbumsState: AlbumsStateType = {
  albums: [],
  loading: false,
  error: null
}

const contactsReducer: (state: AlbumsStateType, action: AlbumsActionType) => AlbumsStateType = (state, action) => {
  switch (action.type) {
    case 'FIND_ALBUMS':
      return {
        ...state,
        albums: action.payload
      }
    default:
      return state
  }
}

export default contactsReducer
