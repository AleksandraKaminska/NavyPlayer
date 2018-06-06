const initialState = {title: '', artist: {name: ''}, album: {cover_big: ''}, id: ''};
export default function (state = initialState, action) {
    switch (action.type) {
        case 'PREV_TRACK':
            return action.prev;
            break;
    }
    return state;
}
