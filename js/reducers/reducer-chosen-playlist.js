export default function (state = 1479458365, action) {
    switch (action.type) {
        case 'CHANGE_PLAYLIST':
            return action.chosenPlaylist;
            break;
    }
    return state;
}
