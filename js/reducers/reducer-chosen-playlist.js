export default function (state = 1677006641, action) {
    switch (action.type) {
        case 'CHANGE_PLAYLIST':
            return action.chosenPlaylist;
            break;
    }
    return state;
}
