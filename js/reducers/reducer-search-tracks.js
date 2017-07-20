export default function (state = [], action) {
    switch (action.type) {
        case 'SEARCH_TRACKS':
            return action.searchTracks;
            break;
    }
    return state;
}
