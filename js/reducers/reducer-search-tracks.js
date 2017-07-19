export default function (state = [], action) {
  console.log('REDUCER - state: ', state, ', action: ', action);
    switch (action.type) {
        case 'SEARCH_TRACKS':
            return action.searchTracks;
            break;
    }
    return state;
}
