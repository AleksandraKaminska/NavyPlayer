export default function (state = {}, action) {
    switch (action.type) {
        case 'FIND_ARTIST':
            return action.artist;
        default: 
            return state;
    }
}
