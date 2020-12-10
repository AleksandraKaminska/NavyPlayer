import { TrackType } from '../types/deezerData'
const { DZ } = window

export const searchArtistInfo = (track: TrackType): void => {
  // searchArtist(track.artist.id)
  // searchTopTracks(track.artist.id)
  // searchArtistPlaylists(track.artist.id)
  // searchAlbums(track.artist.id)
  // searchSimilarArtists(track.artist.id)
  DZ?.ready(() => DZ?.player?.playTracks([track.id]))
}
