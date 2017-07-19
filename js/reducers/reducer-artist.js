export default function (state = {}, action) {
    switch (action.type) {
        case 'FIND_ARTIST':
            return action.artistInfo;
            break;
    }
    return state;
}
