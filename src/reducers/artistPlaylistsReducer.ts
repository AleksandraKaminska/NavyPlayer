import { PlaylistType } from '../types/deezerData'

export type ArtistPlaylistsActionType = {
  type: string
  payload: ArtistPlaylistsStateType
}

export type ArtistPlaylistsStateType = {
  data: Array<PlaylistType>
  total: number
}

const similarArtistsReducer: (
  state: ArtistPlaylistsStateType,
  action: ArtistPlaylistsActionType
) => ArtistPlaylistsStateType = (state, action) => {
  switch (action.type) {
    case 'ARTIST_PLAYLISTS':
      return action.payload
    default:
      return state
  }
}

export default similarArtistsReducer
