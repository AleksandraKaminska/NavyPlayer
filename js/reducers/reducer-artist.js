export default function (state = {}, action) {
    switch (action.type) {
        case 'FIND_ARTIST':
            return action.artist;
            break;
    }
    return state;
}
