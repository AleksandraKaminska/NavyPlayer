import albumsReducer from './albumsReducer'
import albumsTracksReducer from './albumReducer'
// import ArtistReducer from './reducer-artist'
// import SimilarArtistsReducer from './reducer-similar-artists'
// import TopTracksReducer from './reducer-top-tracks'
// import ArtistPlaylistsReducer from './reducer-artist-playlists'
// import ChosenPlaylistReducer from './reducer-chosen-playlist'
import trackReducer from './trackReducer'
// import PrevTrackReducer from './reducer-previous-track'
// import FlowReducer from './reducer-flow'
// import ArtistPlaylistReducer from './reducer-artist-playlist'
// import top from './reducer-top'
import contactsReducer from './contactsReducer'

export const mainReducer: (state: any, action: any) => any = (state, action) => {
  console.log(state, action)
  return {
    contacts: contactsReducer(state, action),
    albums: albumsReducer(state, action),
    album: albumsTracksReducer(state, action),
    // artist: ArtistReducer,
    // chosenPlaylist: ChosenPlaylistReducer,
    track: trackReducer(state, action)
    // topTracks: TopTracksReducer,
    // artistPlaylists: ArtistPlaylistsReducer,
    // similar: SimilarArtistsReducer,
    // prev: PrevTrackReducer,
    // flow: FlowReducer,
    // artistPlaylist: ArtistPlaylistReducer,
    // top: topReducer
  }
}
