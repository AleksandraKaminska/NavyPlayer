import albumsReducer from './albumsReducer'
import albumsTracksReducer from './albumReducer'
// import ArtistReducer from './reducer-artist'
// import SimilarArtistsReducer from './reducer-similar-artists'
// import TopTracksReducer from './reducer-top-tracks'
// import ArtistPlaylistsReducer from './reducer-artist-playlists'
// import ChosenPlaylistReducer from './reducer-chosen-playlist'
import trackReducer from './trackReducer'
import previousTracksReducer from './previousTracksReducer'
// import FlowReducer from './reducer-flow'
// import ArtistPlaylistReducer from './reducer-artist-playlist'
// import top from './reducer-top'
import contactsReducer from './contactsReducer'
import { ArtistType, TrackType } from '../types/deezerData'

export type StateType = {
  albums: Array<any>
  album: any
  artist: ArtistType
  chosenPlaylist: any
  track: TrackType
  topTracks: Array<any>
  artistPlaylists: Array<any>
  similar: any
  previousTracks: Array<any>
  flow: any
  artistPlaylist: any
  top: any
}

export const initialState: StateType = {
  albums: [],
  album: null,
  artist: {},
  chosenPlaylist: null,
  track: {},
  topTracks: [],
  artistPlaylists: [],
  similar: null,
  previousTracks: [],
  flow: null,
  artistPlaylist: null,
  top: null
}

export const mainReducer: (state: any, action: any) => any = (state, action) => {
  console.log(state, action)
  return {
    albums: albumsReducer(state.albums, action),
    album: albumsTracksReducer(state.album, action),
    // artist: ArtistReducer,
    // chosenPlaylist: ChosenPlaylistReducer,
    track: trackReducer(state.track, action),
    // topTracks: TopTracksReducer,
    // artistPlaylists: ArtistPlaylistsReducer,
    // similar: SimilarArtistsReducer,
    previousTracks: previousTracksReducer(state.previousTracks, action)
    // flow: FlowReducer,
    // artistPlaylist: ArtistPlaylistReducer,
    // top: topReducer
  }
}
