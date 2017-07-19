import {combineReducers} from 'redux';

// Reducers
import ConcertsReducer from './reducer-concerts';
import ArtistReducer from './reducer-artist';

const reducers = combineReducers({
    concerts: ConcertsReducer,
    artistInfo: ArtistReducer
});

export default reducers;
