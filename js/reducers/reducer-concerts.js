export default function (state = [], action) {
  console.log('REDUCER - state: ', state, ', action: ', action);
    switch (action.type) {
        case 'FIND_CONCERTS':
            return action.concerts;
            break;
    }
    return state;
}
