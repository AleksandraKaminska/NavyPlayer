export default function (state = 148610381, action) {
    switch (action.type) {
        case 'CHANGE_PLAYLIST':
            return action.chosenPlaylist;
            break;
    }
    return state;
}
