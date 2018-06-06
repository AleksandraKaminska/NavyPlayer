export default function (state = 1629925235, action) {
    switch (action.type) {
        case 'CHANGE_PLAYLIST':
            return action.chosenPlaylist
        default:
            return state
    }
}
