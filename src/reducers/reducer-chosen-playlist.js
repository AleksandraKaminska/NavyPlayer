export default function(state = 2098157264, action) {
  switch (action.type) {
    case 'CHANGE_PLAYLIST':
      return action.chosenPlaylist
    default:
      return state
  }
}
