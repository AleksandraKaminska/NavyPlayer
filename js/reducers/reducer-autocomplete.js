export default function (state = '', action) {
  console.log('REDUCER - state: ', state, ', action: ', action);
    switch (action.type) {
        case 'AUTOCOMPLETE':
            return state + action.autocompleteValue;
            break;
    }
    return state;
}
