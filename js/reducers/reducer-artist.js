export default function (state = {}, action) {
  console.log('REDUCER - state: ', state, ', action: ', action);
    switch (action.type) {
        case 'FIND_ARTIST':
            return action.artistInfo;
            break;
    }
    return state;
}
