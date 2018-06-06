const initialState = {title: '', artist: {name: ''}, album: {cover_big: ''}, id: ''};
export default function (state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_TRACK':
            return action.track.album ? Object.assign({}, action.track) : Object.assign({}, action.track, { album: { cover_big: action.albumCover } });
            break;
    }
    return state;
}
