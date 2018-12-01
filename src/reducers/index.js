import { combineReducers } from 'redux'

// Reducers
import AlbumsReducer from './reducer-albums'
import AlbumsTracksReducer from './reducer-albumsTracks'
import ArtistReducer from './reducer-artist'
import SimilarArtistsReducer from './reducer-similar-artists'
import TopTracksReducer from './reducer-top-tracks'
import ArtistPlaylistsReducer from './reducer-artist-playlists'
import ChosenPlaylistReducer from './reducer-chosen-playlist'
import TrackReducer from './reducer-track'
import PrevTrackReducer from './reducer-previous-track'
import FlowReducer from './reducer-flow'
import ArtistPlaylistReducer from './reducer-artist-playlist'
import top from './reducer-top'

const reducers = combineReducers({
  albums: AlbumsReducer,
  album: AlbumsTracksReducer,
  artist: ArtistReducer,
  chosenPlaylist: ChosenPlaylistReducer,
  track: TrackReducer,
  topTracks: TopTracksReducer,
  artistPlaylists: ArtistPlaylistsReducer,
  similar: SimilarArtistsReducer,
  prev: PrevTrackReducer,
  flow: FlowReducer,
  artistPlaylist: ArtistPlaylistReducer,
  top
})

export default reducers
