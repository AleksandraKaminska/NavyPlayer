export default function (state = [], action) {
    switch (action.type) {
        case 'FIND_TOP_TRACKS':
            return action.topTracks;
            break;
    }
    return state;
}
