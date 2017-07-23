export default function (state = [], action) {
    switch (action.type) {
        case 'FIND_ALBUMS':
            return action.albums;
            break;
    }
    return state;
}
