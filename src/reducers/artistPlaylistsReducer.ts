export type ArtistPlaylistsActionType = {
  type: string
  payload: any
}

const similarArtistsReducer: (state: any, action: ArtistPlaylistsActionType) => any = (state, action) => {
  switch (action.type) {
    case 'ARTIST_PLAYLISTS':
      return action.payload
    default:
      return state
  }
}

export default similarArtistsReducer
