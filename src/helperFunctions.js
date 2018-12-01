import store from 'store'
import * as actions from 'actions'
import fetchJsonp from 'fetch-jsonp'
const { DZ } = window

function randomNumber(array) {
  const prev = store.getState().prev.slice(-1)[0]
  let randomNumber = 0
  do {
    randomNumber = Math.floor(Math.random() * array.length)
  } while (array.length > 1 && prev && prev.id === array[randomNumber].id)
  return array[randomNumber]
}

export function random(props) {
  const regex = /\/(artist|playlist|album)\/(\d+)/
  const href = window.location.href.match(regex)
  if (DZ) {
    if (href) {
      // eslint-disable-next-line
      switch (href[1]) {
        case 'artist':
          randomArtistTrack(props, href[2])
          break
        case 'album':
          randomAlbumTrack(props, href[2])
          break
        case 'playlist':
          randomPlaylistTrack(props, href[2])
      }
    } else {
      props.artistPlaylist && props.artistPlaylist.length
        ? randomArtistTrack(props)
        : props.album.id
        ? randomAlbumTrack(props)
        : props.chosenPlaylist
        ? randomPlaylistTrack(props)
        : randomFlowTrack(props)
    }
  }
}

export function randomArtistTrack(
  { artist: { id }, track, artistPlaylist },
  artistID = null
) {
  store.dispatch(actions.prevTrackAction(track))
  // eslint-disable-next-line
  if ((artistID && artistID != id) || (id && !artistID)) {
    fetchArtistData(artistID || id)
  } else {
    const newTrack = randomNumber(artistPlaylist)
    store.dispatch(actions.changeTrackAction(newTrack))
    DZ && DZ.player.playTracks([newTrack.id])
  }
}

function fetchArtistData(id) {
  fetchJsonp(`https://api.deezer.com/artist/${id}/top?limit=100&output=jsonp`)
    .then(resp => resp.json())
    .then(({ data }) => {
      store.dispatch(actions.changeArtistPlaylistAction(data))
      const newTrack = randomNumber(data)
      store.dispatch(actions.changeTrackAction(newTrack))
      searchArtistInfo(newTrack)
      DZ && DZ.player.playTracks([newTrack.id])
    })
}

export function randomFlowTrack(props) {
  const { flow, track } = props
  store.dispatch(actions.prevTrackAction(track))
  store.dispatch(actions.changeTrackAction(randomNumber(flow)))
  searchArtistInfo(store.getState().track)
}

function fetchAlbumData(id) {
  return dispatch =>
    fetchJsonp(`https://api.deezer.com/album/${id}?output=jsonp`)
      .then(response => response.json())
      .then(
        ({ tracks: { data }, cover_xl: coverXl, cover_medium: coverMedium }) =>
          dispatch(
            actions.changeTrackAction(randomNumber(data), coverXl, coverMedium)
          )
      )
}

export function randomAlbumTrack(props, albumID = null) {
  const { album, track } = props
  store.dispatch(actions.prevTrackAction(track))
  store.dispatch(fetchAlbumData(albumID || album.id)).then(({ track }) => {
    searchArtistInfo(track)
    DZ && DZ.player.playTracks([track.id])
  })
}

function fetchData(chosenPlaylist) {
  return dispatch =>
    fetchJsonp(`https://api.deezer.com/playlist/${chosenPlaylist}?output=jsonp`)
      .then(response => response.json())
      .then(({ tracks }) => {
        if (tracks) {
          return dispatch(actions.changeTrackAction(randomNumber(tracks.data)))
        }
      })
}

function randomPlaylistTrack(props, playlistID = null) {
  const { chosenPlaylist, track } = props
  store.dispatch(actions.prevTrackAction(track))
  store
    .dispatch(fetchData(playlistID || chosenPlaylist))
    .then(resp => resp && searchArtistInfo(resp.track))
}

function searchArtist(id) {
  return fetchJsonp(`https://api.deezer.com/artist/${id}?output=jsonp`)
    .then(response => response.json())
    .then(artist =>
      store.dispatch({
        type: 'FIND_ARTIST',
        artist
      })
    )
}

function searchTopTracks(id) {
  return fetchJsonp(`https://api.deezer.com/artist/${id}/top?output=jsonp`)
    .then(response => response.json())
    .then(({ data }) =>
      store.dispatch({
        type: 'FIND_TOP_TRACKS',
        topTracks: data || null
      })
    )
}

function searchArtistPlaylists(id) {
  return fetchJsonp(
    `https://api.deezer.com/artist/${id}/playlists?output=jsonp`
  )
    .then(response => response.json())
    .then(({ data }) =>
      store.dispatch({
        type: 'FIND_ARTIST_PLAYLISTS',
        artistPlaylists: data || null
      })
    )
}

function searchAlbums(id) {
  fetchJsonp(`https://api.deezer.com/artist/${id}/albums?output=jsonp`)
    .then(response => response.json())
    .then(({ data }) =>
      store.dispatch({
        type: 'FIND_ALBUMS',
        albums: data || null
      })
    )
}

function searchSimilarArtists(id) {
  fetchJsonp(
    `https://api.deezer.com/artist/${id}/related?limit=10&output=jsonp`
  )
    .then(response => response.json())
    .then(({ data }) =>
      store.dispatch({
        type: 'FIND_SIMILAR_ARTISTS',
        similar: data || null
      })
    )
}

export function searchArtistInfo(track) {
  searchArtist(track.artist.id)
  searchTopTracks(track.artist.id)
  searchArtistPlaylists(track.artist.id)
  searchAlbums(track.artist.id)
  searchSimilarArtists(track.artist.id)
  DZ && DZ.ready(() => DZ && DZ.player.playTracks([track.id]))
}

export function choosePlaylist(id, props) {
  store.dispatch(actions.changePlaylistAction(id))
  randomPlaylistTrack({
    ...props,
    chosenPlaylist: id
  })
  store.dispatch(actions.changeAlbumAction(0))
  store.dispatch(actions.changeArtistPlaylistAction([]))
}

export function login() {
  DZ &&
    DZ.login(
      ({ authResponse }) => {
        if (authResponse.accessToken) {
          DZ &&
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
                        login.textContent = 'FLOW'
                      }
                    }
                  })
              }
            })
        }
      },
      { perms: 'basic_access,email' }
    )
}
