export const changePlaylistAction = chosenPlaylist => ({
  type: 'CHANGE_PLAYLIST',
  chosenPlaylist
})

export const changeAlbumAction = album => ({
  type: 'FIND_ALBUMSTRACKS',
  album
})

export const changeTrackAction = (track, coverXl, coverMedium) => ({
  type: 'CHANGE_TRACK',
  track,
  coverXl,
  coverMedium
})

export const prevTrackAction = prev => ({
  type: 'PREV_TRACK',
  prev
})

export const changeArtistPlaylistAction = data => ({
  type: 'ARTIST_PLAYLIST',
  data
})
