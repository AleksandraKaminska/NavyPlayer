export const changePlaylistAction = chosenPlaylist => ({
    type: 'CHANGE_PLAYLIST',
    chosenPlaylist
})

export const changeAlbumAction = album => ({
    type: 'FIND_ALBUMSTRACKS',
    album
})

export const searchTracksAction = searchTracks => ({
    type: 'SEARCH_TRACKS',
    searchTracks
})

export const autocompleteAction = autocompleteValue => ({
    type: 'AUTOCOMPLETE',
    autocompleteValue
})

export const changeTrackAction = (track, albumCover) => ({
    type: 'CHANGE_TRACK',
    track,
    albumCover
})

export const prevTrackAction = prev => ({
    type: 'PREV_TRACK',
    prev
})

export const changeArtistPlaylistAction = data => ({
    type: 'ARTIST_PLAYLIST',
    data
})