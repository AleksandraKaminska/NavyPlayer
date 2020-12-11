import albumsReducer from './albumsReducer'
import albumReducer from './albumReducer'
import artistReducer from './artistReducer'
import similarArtistsReducer from './similarArtistsReducer'
import topTracksReducer from './topTracksReducer'
import artistPlaylistsReducer from './artistPlaylistsReducer'
// import chosenPlaylistReducer from './chosenPlaylistReducer'
import trackReducer from './trackReducer'
import previousTracksReducer from './previousTracksReducer'
// import FlowReducer from './reducer-flow'
// import ArtistPlaylistReducer from './reducer-artist-playlist'
// import top from './reducer-top'
import { ArtistType, AlbumType, TrackType } from '../types/deezerData'

export type StateType = {
  album: AlbumType
  albums: Array<AlbumType>
  artist: ArtistType
  chosenPlaylist: any
  track: TrackType
  topTracks: Array<TrackType>
  artistPlaylists: Array<any>
  similarArtists: Array<ArtistType>
  previousTracks: Array<TrackType>
  flow: any
  artistPlaylist: any
  top: any
}

export const initialState: StateType = {
  album: {},
  albums: [],
  artist: {},
  chosenPlaylist: null,
  track: {},
  topTracks: [],
  artistPlaylists: [],
  similarArtists: [],
  previousTracks: [],
  flow: null,
  artistPlaylist: null,
  top: null
}

export const mainReducer: (state: any, action: any) => any = (state, action) => {
  console.log(state)
  console.log(action)
  return {
    album: albumReducer(state.album, action),
    albums: albumsReducer(state.albums, action),
    artist: artistReducer(state.artist, action),
    // chosenPlaylist: ChosenPlaylistReducer,
    track: trackReducer(state.track, action),
    topTracks: topTracksReducer(state.topTracks, action),
    artistPlaylists: artistPlaylistsReducer(state.artistPlaylists, action),
    similarArtists: similarArtistsReducer(state.similarArtists, action),
    previousTracks: previousTracksReducer(state.previousTracks, action)
    // flow: FlowReducer,
    // artistPlaylist: ArtistPlaylistReducer,
    // top: topReducer
  }
}
