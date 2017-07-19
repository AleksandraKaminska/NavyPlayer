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
