import fetchJsonp from 'fetch-jsonp'
import { searchArtistInfo } from './helpers/search'
const { DZ } = window

type DispatchType = React.Dispatch<{ type: string; payload: any }>

const randomNumber = (array, state) => {
  const prev = state.previousTracks.slice(-1)[0]
  let randomNumber = 0
  do {
    randomNumber = Math.floor(Math.random() * array.length)
  } while (array.length > 1 && prev && prev.id === array[randomNumber].id)
  return array[randomNumber]
}

export const random = (state, dispatch) => {
  const regex = /\/(artist|playlist|album)\/(\d+)/
  const href = window.location.href.match(regex)
  console.log(href)
  if (href) {
    switch (href[1]) {
      case 'artist':
        randomArtistTrack(state, dispatch, href[2])
        break
      case 'album':
        randomAlbumTrack(state, dispatch, href[2])
        break
      case 'playlist':
        randomPlaylistTrack(state, dispatch, href[2])
    }
  } else {
    state.artistPlaylist?.length
      ? randomArtistTrack(state, dispatch)
      : state.album.id
      ? randomAlbumTrack(state, dispatch)
      : state.playlist
      ? randomPlaylistTrack(state, dispatch)
      : randomFlowTrack(state, dispatch)
  }
}

export const randomArtistTrack: (state, dispatch: DispatchType, artistID?: number | string) => void = (
  state,
  dispatch,
  artistID
) => {
  dispatch({ type: 'PREV_TRACK', payload: state.track })
  if ((artistID && artistID != state.artist.id) || (state.artist.id && !artistID)) {
    fetchArtistData(artistID || state.artist.id, state, dispatch)
  } else {
    const newTrack = randomNumber(state.artistPlaylist, state)
    dispatch({ type: 'CHANGE_TRACK', payload: newTrack })
    DZ?.player.playTracks([newTrack.id])
  }
}

const fetchArtistData = (id: number, state, dispatch) => {
  fetchJsonp(`https://api.deezer.com/artist/${id}/top?limit=100&output=jsonp`)
    .then((resp) => resp.json())
    .then(({ data }) => {
      dispatch({ type: 'ARTIST_PLAYLIST', payload: data })
      const newTrack = randomNumber(data, state)
      dispatch({ type: 'CHANGE_TRACK', payload: newTrack })
      searchArtistInfo(newTrack, dispatch)
      DZ?.player.playTracks([newTrack.id])
    })
}

export const randomFlowTrack = (state, dispatch) => {
  dispatch({ type: 'PREV_TRACK', payload: state.track })
  const track = randomNumber(state.flow, state)
  dispatch({ type: 'CHANGE_TRACK', payload: track })
  searchArtistInfo(track, dispatch)
}

const fetchAlbumData = (id, state, dispatch) =>
  fetchJsonp(`https://api.deezer.com/album/${id}?output=jsonp`)
    .then((response) => response.json())
    .then(({ tracks }) => {
      const newTrack = randomNumber(tracks.data, state)
      dispatch({ type: 'CHANGE_TRACK', payload: newTrack })
      searchArtistInfo(newTrack, dispatch)
      DZ?.player.playTracks([newTrack.id])
    })

export const randomAlbumTrack: (state, dispatch: DispatchType, albumID?: number | string) => void = (
  state,
  dispatch,
  albumID
) => {
  const { album } = state
  dispatch({ type: 'PREV_TRACK', payload: state.track })
  fetchAlbumData(albumID || album.id, state, dispatch)
}

const fetchData = (playlist, state, dispatch) =>
  fetchJsonp(`https://api.deezer.com/playlist/${playlist}?output=jsonp`)
    .then((response) => response.json())
    .then(({ tracks }) => {
      if (tracks) {
        const track = randomNumber(tracks.data, state)
        dispatch({ type: 'CHANGE_TRACK', payload: track })
        searchArtistInfo(track, dispatch)
      }
    })

export const randomPlaylistTrack: (state, dispatch: DispatchType, playlistID?: number | string) => void = (
  state,
  dispatch,
  playlistID
) => {
  dispatch({ type: 'PREV_TRACK', payload: state.track })
  fetchData(playlistID || state.playlist, state, dispatch)
}

export const changePlaylist = (state, dispatch: DispatchType, id?: number) => {
  dispatch({ type: 'CHANGE_PLAYLIST', payload: id })
  dispatch({ type: 'FIND_ALBUM', payload: 0 })
  dispatch({ type: 'ARTIST_PLAYLIST', payload: [] })
  randomPlaylistTrack(
    {
      ...state,
      playlist: id
    },
    dispatch
  )
}
