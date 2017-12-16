export default function (state = 3773392382, action) {
    switch (action.type) {
        case 'CHANGE_PLAYLIST':
            return action.chosenPlaylist;
            break;
    }
    return state;
}
