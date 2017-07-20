export default function (state = '', action) {
    switch (action.type) {
        case 'AUTOCOMPLETE':
            return action.autocompleteValue;
            break;
    }
    return state;
}
