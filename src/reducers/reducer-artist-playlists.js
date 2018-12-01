export default function (state = [], action) {
  switch (action.type) {
    case 'FIND_ARTIST_PLAYLISTS':
      return action.artistPlaylists
    default:
      return state
  }
}
