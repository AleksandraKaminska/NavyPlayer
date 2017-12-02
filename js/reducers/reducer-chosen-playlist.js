export default function (state = 3773396182, action) {
    switch (action.type) {
        case 'CHANGE_PLAYLIST':
            return action.chosenPlaylist;
            break;
    }
    return state;
}
