import { changeTrackAction, prevTrackAction } from './../actions/index.js';
import store from './../store';

export function searchArtist(id) {
    $.ajax({
        dataType: "jsonp",
        url: `https://api.deezer.com/artist/${id}?output=jsonp`,
        success: response => store.dispatch({ type: 'FIND_ARTIST', artist: response })
    });
}

export function searchTopTracks(id) {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/artist/${id}/top?output=jsonp`,
        success : response => store.dispatch({ type: 'FIND_TOP_TRACKS', topTracks: response.data })
    });
}

export function searchAlbums(id) {
    $.ajax({
        dataType: "jsonp",
        url: `https://api.deezer.com/artist/${id}/albums?output=jsonp`,
        success: response => store.dispatch({ type: 'FIND_ALBUMS', albums: response.data })
    });
}

export function searchSimilarArtists(id) {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/artist/${id}/related?limit=10&output=jsonp`,
        success : response => store.dispatch({ type: 'FIND_SIMILAR_ARTISTS', similar: response.data })
    });
}
