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

export const completeAction = (autocompleteValue) => {
    return {
        type: 'COMPLETE',
        autocompleteValue
    }
};

export const changeTrackAction = (track) => {
    return {
        type: 'CHANGE_TRACK',
        track
    }
};
