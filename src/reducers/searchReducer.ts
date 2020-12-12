import { AlbumType, TrackType, ArtistType, PlaylistType } from '../types/deezerData'

export type SearchActionType = {
  type: string
  payload: SearchStateType
}

export type SearchStateType = {
  radios: {
    data: Array<any>
  }
  tracks: {
    data: Array<TrackType>
  }
  albums: {
    data: Array<AlbumType>
  }
  artists: {
    data: Array<ArtistType>
  }
  playlists: {
    data: Array<PlaylistType>
  }
  podcasts: {
    data: Array<any>
  }
  total: number
  next: string
}

const searchReducer: (state: SearchStateType, action: SearchActionType) => SearchStateType = (state, action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.payload
    default:
      return state
  }
}

export default searchReducer
