import {combineReducers} from 'redux';

// Reducers
import ConcertsReducer from './reducer-concerts';
import ArtistReducer from './reducer-artist';
import SimilarArtistsReducer from './reducer-similar-artists';
import TopTracksReducer from './reducer-top-tracks';
import ChosenPlaylistReducer from './reducer-chosen-playlist';
import SearchTracksReducer from './reducer-search-tracks';
import AutocompleteReducer from './reducer-autocomplete';
import TrackReducer from './reducer-track';

const reducers = combineReducers({
    concerts: ConcertsReducer,
    artist: ArtistReducer,
    chosenPlaylist: ChosenPlaylistReducer,
    searchTracks: SearchTracksReducer,
    autocompleteValue: AutocompleteReducer,
    track: TrackReducer,
    topTracks: TopTracksReducer,
    similar: SimilarArtistsReducer
});

export default reducers;
