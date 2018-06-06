export default function (state = '', action) {
    switch (action.type) {
        case 'AUTOCOMPLETE':
            return action.autocompleteValue
        default:
            return state
    }
}
