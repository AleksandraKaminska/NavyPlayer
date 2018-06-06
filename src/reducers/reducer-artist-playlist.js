export default function (state = [], action) {
  switch (action.type) {
    case 'ARTIST_PLAYLIST':
      return action.data || state
    default:
      return state
  }
}
