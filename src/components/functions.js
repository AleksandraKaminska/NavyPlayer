import store from './../store';
import { changeTrackAction, prevTrackAction } from './../actions/index.js';
import fetchJsonp from 'fetch-jsonp';
const { DZ } = window;

export function searchArtist(id) {
    fetchJsonp(`https://api.deezer.com/artist/${id}?output=jsonp`)
    .then(response => response.json())
    .then(artist => store.dispatch({ 
        type: 'FIND_ARTIST', 
        artist
    }))
}

export function searchTopTracks(id) {
    fetchJsonp(`https://api.deezer.com/artist/${id}/top?output=jsonp`)
    .then(response => response.json())
    .then(({ data }) => store.dispatch({ 
        type: 'FIND_TOP_TRACKS', 
        topTracks: data || null 
    }))
}

export function searchAlbums(id) {
    fetchJsonp(`https://api.deezer.com/artist/${id}/albums?output=jsonp`)
    .then(response => response.json())
    .then(({ data }) => store.dispatch({ 
        type: 'FIND_ALBUMS', 
        albums: data || null
    }))
}

export function searchSimilarArtists(id) {
    fetchJsonp(`https://api.deezer.com/artist/${id}/related?limit=10&output=jsonp`)
    .then(response => response.json())
    .then(({ data }) => store.dispatch({ 
        type: 'FIND_SIMILAR_ARTISTS', 
        similar: data || null
    }))
}

export function randomAlbumTrack(props) {
    const { album: { id, cover_big }, track } = props;
    fetchJsonp(`https://api.deezer.com/album/${id}?output=jsonp`)
    .then(response => response.json())
    .then(({ tracks }) => {
        const randomNumber = Math.floor(Math.random() * tracks.data.length);
        store.dispatch(prevTrackAction(track));
        store.dispatch(changeTrackAction(tracks.data[randomNumber], cover_big));
        DZ.player.playTracks([track.id]);
    })
}

export function randomTrack(props) {
    const { chosenPlaylist, track } = props;
    fetchJsonp(`https://api.deezer.com/playlist/${chosenPlaylist}?output=jsonp`)
    .then(response => response.json())
    .then(({ tracks: { data } }) => {
        const randomNumber = Math.floor(Math.random() * data.length);
        store.dispatch(prevTrackAction(track));
        store.dispatch(changeTrackAction(data[randomNumber]));
        searchArtist(track.artist.id);
        searchTopTracks(track.artist.id);
        searchAlbums(track.artist.id);
        searchSimilarArtists(track.artist.id);
        DZ.player.playTracks([track.id]);
    })
}

export function login() {
    DZ.login(({ authResponse }) => {
        if (authResponse) {
            DZ.api('/user/me', response => console.log('Success.'));
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        perms: 'basic_access,email'
    });
}