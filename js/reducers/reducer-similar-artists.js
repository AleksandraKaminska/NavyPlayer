export default function (state = [], action) {
    switch (action.type) {
        case 'FIND_SIMILAR_ARTISTS':
            return action.similar;
            break;
    }
    return state;
}
