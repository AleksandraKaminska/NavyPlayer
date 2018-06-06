import store from 'store'
import { changeTrackAction, prevTrackAction, changeArtistPlaylistAction } from 'actions/index.js'
import fetchJsonp from 'fetch-jsonp'
const { DZ } = window

export function random(props) {
    const href = window.location.href
    const artist = href.match(/\/artist\/(\d+)/)
    const playlist = href.match(/\/playlist\/(\d+)/)
    const album = href.match(/\/album\/(\d+)/)
    return artist || (props.artistPlaylist && props.artistPlaylist.length) ? randomArtistTrack(props, artist)
        : playlist || props.chosenPlaylist ? randomPlaylistTrack(props, playlist)
        : album || props.album ? randomAlbumTrack(props, album)
        : randomFlowTrack(props)
}

export function randomArtistTrack({ artist: { id }, track, artistPlaylist }, artistID = null) {
    store.dispatch(prevTrackAction(track))
    // eslint-disable-next-line
    if ((artistID && artistID[1] != id) || (id && !artistID)) {
        const ID = artistID ? artistID[1] : id
        fetchArtistData(ID)
    } else {
        const randomNumber = Math.floor(Math.random() * artistPlaylist.length)
        const newTrack = artistPlaylist[randomNumber]
        store.dispatch(changeTrackAction(newTrack))
        DZ.player.playTracks([newTrack.id])
    }
}

function fetchArtistData(id) {
    fetchJsonp(`https://api.deezer.com/artist/${id}/top?limit=100&output=jsonp`)
    .then(resp => resp.json())
    .then(data => {
        if (data) {
            data = data.data
            store.dispatch(changeArtistPlaylistAction(data))
            const randomNumber = Math.floor(Math.random() * data.length)
            const newTrack = data[randomNumber]
            store.dispatch(changeTrackAction(newTrack))
            searchArtistInfo(newTrack)
            DZ.player.playTracks([newTrack.id])
        }
    })
}

export function randomFlowTrack(props) {
    const { flow, track } = props
    store.dispatch(prevTrackAction(track))
    const randomNumber = Math.floor(Math.random() * flow.length)
    store.dispatch(changeTrackAction(flow[randomNumber]))
    searchArtistInfo(store.getState().track)
    window.history.pushState({}, '', '/flow')
}

function fetchAlbumData(id, cover_big) {
    return dispatch => fetchJsonp(`https://api.deezer.com/album/${id}?output=jsonp`)
    .then(response => response.json())
    .then(({ tracks }) => {
        const randomNumber = Math.floor(Math.random() * tracks.data.length)
        return dispatch(changeTrackAction(tracks.data[randomNumber], cover_big))
    })
}

export function randomAlbumTrack(props, albumID = null) {
    const { album: { id, cover_big }, track } = props
    store.dispatch(prevTrackAction(track))
    const ID = albumID ? albumID[1] : id
    store.dispatch(fetchAlbumData(ID, cover_big))
    .then(({ track }) => {
        searchArtistInfo(track)
        DZ.player.playTracks([track.id])
    })
}

function fetchData(chosenPlaylist) {
    return dispatch => fetchJsonp(`https://api.deezer.com/playlist/${chosenPlaylist}?output=jsonp`)
    .then(response => response.json())
    .then(({ tracks }) => {
        if (tracks) {
            const randomNumber = Math.floor(Math.random() * tracks.data.length)
            return dispatch(changeTrackAction(tracks.data[randomNumber]))
        }
    })
}

export function randomPlaylistTrack(props, playlistID = null) {
    const { chosenPlaylist, track } = props
    store.dispatch(prevTrackAction(track))
    const ID = playlistID ? playlistID[1] : chosenPlaylist
    store.dispatch(fetchData(ID))
    .then(resp => resp && searchArtistInfo(resp.track))
}

function searchArtist(id) {
    return fetchJsonp(`https://api.deezer.com/artist/${id}?output=jsonp`)
    .then(response => response.json())
    .then(artist => store.dispatch({
        type: 'FIND_ARTIST',
        artist
    }))
}

function searchTopTracks(id) {
    return fetchJsonp(`https://api.deezer.com/artist/${id}/top?output=jsonp`)
    .then(response => response.json())
    .then(({ data }) => store.dispatch({
        type: 'FIND_TOP_TRACKS',
        topTracks: data || null
    }))
}

function searchAlbums(id) {
    fetchJsonp(`https://api.deezer.com/artist/${id}/albums?output=jsonp`)
    .then(response => response.json())
    .then(({ data }) => store.dispatch({
        type: 'FIND_ALBUMS',
        albums: data || null
    }))
}

function searchSimilarArtists(id) {
    fetchJsonp(`https://api.deezer.com/artist/${id}/related?limit=10&output=jsonp`)
    .then(response => response.json())
    .then(({ data }) => store.dispatch({
        type: 'FIND_SIMILAR_ARTISTS',
        similar: data || null
    }))
}

export function searchArtistInfo(track) {
    searchArtist(track.artist.id)
    searchTopTracks(track.artist.id)
    searchAlbums(track.artist.id)
    searchSimilarArtists(track.artist.id)
    DZ.ready(() => DZ.player.playTracks([track.id]))
}

export function login() {
    DZ.login(({ authResponse }) => {
        if (authResponse.accessToken) {
            DZ.api('/user/me', response => {
                if (response.id) {
                    let login = document.querySelector('.login')
                    login.style.display = 'none'
                    const URL = `/user/${response.id}/flow?access_token=${authResponse.accessToken}&limit=100&output=jsonp`
                    fetchJsonp(`https://api.deezer.com${URL}`)
                    .then(resp => resp.json())
                    .then(data => {
                        if (data) {
                            data = data.data
                            if (data && data.length) {
                                store.dispatch({
                                    type: 'FLOW',
                                    data
                                })
                                login.style.display = 'block'
                            }
                        }
                    })
                }
            })
        }
    }, { perms: 'basic_access,email' })
}
