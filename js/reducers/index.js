import {combineReducers} from 'redux';

// Reducers
import ConcertsReducer from './reducer-concerts';
import ArtistReducer from './reducer-artist';
import ChosenPlaylistReducer from './reducer-chosen-playlist';
import SearchTracksReducer from './reducer-search-tracks';

const reducers = combineReducers({
    concerts: ConcertsReducer,
    artistInfo: ArtistReducer,
    chosenPlaylist: ChosenPlaylistReducer,
    searchTracks: SearchTracksReducer
});

export default reducers;
