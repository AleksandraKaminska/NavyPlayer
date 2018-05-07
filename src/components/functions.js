import store from './../store';
import { changeTrackAction, prevTrackAction } from './../actions/index.js';
import fetchJsonp from 'fetch-jsonp';
const { DZ } = window;

export function searchArtist(id) {
    fetchJsonp(`https://api.deezer.com/artist/${id}?output=jsonp`)
    .then(response => response.json())
<<<<<<< HEAD
    .then(artist => store.dispatch({ 
        type: 'FIND_ARTIST', 
=======
    .then(artist => store.dispatch({
        type: 'FIND_ARTIST',
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
        artist
    }))
}

export function searchTopTracks(id) {
    fetchJsonp(`https://api.deezer.com/artist/${id}/top?output=jsonp`)
    .then(response => response.json())
<<<<<<< HEAD
    .then(({ data }) => store.dispatch({ 
        type: 'FIND_TOP_TRACKS', 
        topTracks: data || null 
=======
    .then(({ data }) => store.dispatch({
        type: 'FIND_TOP_TRACKS',
        topTracks: data || null
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
    }))
}

export function searchAlbums(id) {
    fetchJsonp(`https://api.deezer.com/artist/${id}/albums?output=jsonp`)
    .then(response => response.json())
<<<<<<< HEAD
    .then(({ data }) => store.dispatch({ 
        type: 'FIND_ALBUMS', 
=======
    .then(({ data }) => store.dispatch({
        type: 'FIND_ALBUMS',
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
        albums: data || null
    }))
}

export function searchSimilarArtists(id) {
    fetchJsonp(`https://api.deezer.com/artist/${id}/related?limit=10&output=jsonp`)
    .then(response => response.json())
<<<<<<< HEAD
    .then(({ data }) => store.dispatch({ 
        type: 'FIND_SIMILAR_ARTISTS', 
=======
    .then(({ data }) => store.dispatch({
        type: 'FIND_SIMILAR_ARTISTS',
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
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
<<<<<<< HEAD
    .then(({ tracks: { data } }) => {
        const randomNumber = Math.floor(Math.random() * data.length);
        store.dispatch(prevTrackAction(track));
        store.dispatch(changeTrackAction(data[randomNumber]));
        searchArtist(track.artist.id);
        searchTopTracks(track.artist.id);
=======
    .then(({ tracks }) => {
        const randomNumber = Math.floor(Math.random() * tracks.data.length);
        store.dispatch(prevTrackAction(track));
        store.dispatch(changeTrackAction(tracks.data[randomNumber]));
        return fetchJsonp(`https://api.deezer.com/artist/${track.artist.id}?output=jsonp`)
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
        searchAlbums(track.artist.id);
        searchSimilarArtists(track.artist.id);
        DZ.player.playTracks([track.id]);
    })
<<<<<<< HEAD
=======
    .then(response => response.json())
    .then(artist => {
        store.dispatch({
            type: 'FIND_ARTIST',
            artist
        })
        return fetchJsonp(`https://api.deezer.com/artist/${track.artist.id}/top?output=jsonp`)
    })
    .then(response => response.json())
    .then(artist => {
        store.dispatch({
            type: 'FIND_TOP_TRACKS',
            topTracks: data || null
        })
        return fetchJsonp(`https://api.deezer.com/artist/${track.artist.id}/albums?output=jsonp`)
    }).
    then(response => response.json())
    .then(({ data }) => store.dispatch({
        type: 'FIND_ALBUMS',
        albums: data || null
    }))
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
}

export function login() {
    DZ.login(({ authResponse }) => {
<<<<<<< HEAD
        if (authResponse) {
            DZ.api('/user/me', response => console.log('Success.'));
=======
        if (authResponse.accessToken) {
            DZ.api('/user/me', response => console.log(response));
>>>>>>> 267288a7bcf68a41aca3cba2ee7338b528c9a9b4
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        perms: 'basic_access,email'
    });
}