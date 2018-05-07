export const changePlaylistAction = (chosenPlaylist) => {
    return {
        type: 'CHANGE_PLAYLIST',
        chosenPlaylist
    }
};

export const searchTracksAction = (searchTracks) => {
    return {
        type: 'SEARCH_TRACKS',
        searchTracks
    }
};

export const autocompleteAction = (autocompleteValue) => {
    return {
        type: 'AUTOCOMPLETE',
        autocompleteValue
    }
};

export const changeTrackAction = (track, albumCover) => {
    return {
        type: 'CHANGE_TRACK',
        track,
        albumCover
    }
};

export const prevTrackAction = (prev) => {
    return {
        type: 'PREV_TRACK',
        prev
    }
};
