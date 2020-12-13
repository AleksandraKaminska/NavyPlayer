import { AlbumType, TrackType, ArtistType, PlaylistType } from '../types/deezerData'

export type SearchActionType = {
  type: string
  payload: SearchStateType
}

export type SearchStateType = {
  tracks?: {
    data: Array<TrackType>
  }
  albums?: {
    data: Array<AlbumType>
  }
  artists?: {
    data: Array<ArtistType>
  }
  playlists?: {
    data: Array<PlaylistType>
  }
  total?: number
  next?: string
}

const searchReducer: (state: SearchStateType, action: SearchActionType) => SearchStateType = (state, action) => {
  switch (action.type) {
    case 'SEARCH':
      return Object.keys(action.payload).reduce((obj, key) => {
        if (key !== 'podcasts' && key !== 'radios') {
          obj[key] = action.payload[key]
        }
        return obj
      }, {})
    default:
      return state
  }
}

export default searchReducer
