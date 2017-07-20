export default function (state = '', action) {
  console.log(state, action);
    switch (action.type) {
        case 'AUTOCOMPLETE':
            return state + action.autocompleteValue;
            break;
        case 'COMPLETE':
            return action.autocompleteValue;
            break;
    }
    return state;
}
