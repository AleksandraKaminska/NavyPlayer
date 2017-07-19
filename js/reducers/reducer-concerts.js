export default function (state = [], action) {
    switch (action.type) {
        case 'FIND_CONCERTS':
            return action.concerts;
            break;
    }
    return state;
}
