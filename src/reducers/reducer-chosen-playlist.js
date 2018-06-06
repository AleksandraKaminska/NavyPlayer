export default function (state = 1266972311, action) {
  switch (action.type) {
    case 'CHANGE_PLAYLIST':
      return action.chosenPlaylist
    default:
      return state
  }
}
