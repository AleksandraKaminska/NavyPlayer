import {combineReducers} from 'redux';

// Reducers
import AlbumsReducer from './reducer-albums';
import AlbumsTracksReducer from './reducer-albumsTracks';
import ArtistReducer from './reducer-artist';
import SimilarArtistsReducer from './reducer-similar-artists';
import TopTracksReducer from './reducer-top-tracks';
import ChosenPlaylistReducer from './reducer-chosen-playlist';
import SearchTracksReducer from './reducer-search-tracks';
import AutocompleteReducer from './reducer-autocomplete';
import TrackReducer from './reducer-track';
import PrevTrackReducer from './reducer-previous-track';

const reducers = combineReducers({
    albums: AlbumsReducer,
    album: AlbumsTracksReducer,
    artist: ArtistReducer,
    chosenPlaylist: ChosenPlaylistReducer,
    searchTracks: SearchTracksReducer,
    autocompleteValue: AutocompleteReducer,
    track: TrackReducer,
    topTracks: TopTracksReducer,
    similar: SimilarArtistsReducer,
    prev: PrevTrackReducer
});

export default reducers;
