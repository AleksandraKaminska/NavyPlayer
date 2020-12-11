import fetchJsonp from 'fetch-jsonp'
import { searchArtistInfo } from './helpers/search'
import { TrackType } from './types/deezerData'
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

// export function random(props) {
//   const regex = /\/(artist|playlist|album)\/(\d+)/
//   const href = window.location.href.match(regex)
//   if (DZ) {
//     if (href) {
//       // eslint-disable-next-line
//       switch (href[1]) {
//         case 'artist':
//           randomArtistTrack(props, href[2])
//           break
//         case 'album':
//           randomAlbumTrack(props, href[2])
//           break
//         case 'playlist':
//           randomPlaylistTrack(props, href[2])
//       }
//     } else {
//       props.artistPlaylist && props.artistPlaylist.length
//         ? randomArtistTrack(props)
//         : props.album.id
//         ? randomAlbumTrack(props)
//         : props.playlist
//         ? randomPlaylistTrack(props)
//         : randomFlowTrack(props)
//     }
//   }
// }

// export function randomArtistTrack({ artist: { id }, track, artistPlaylist }, artistID = null) {
//   store.dispatch(actions.prevTrackAction(track))
//   // eslint-disable-next-line
//   if ((artistID && artistID != id) || (id && !artistID)) {
//     fetchArtistData(artistID || id)
//   } else {
//     const newTrack = randomNumber(artistPlaylist)
//     store.dispatch(actions.changeTrackAction(newTrack))
//     DZ && DZ.player.playTracks([newTrack.id])
//   }
// }

// function fetchArtistData(id) {
//   fetchJsonp(`https://api.deezer.com/artist/${id}/top?limit=100&output=jsonp`)
//     .then((resp) => resp.json())
//     .then(({ data }) => {
//       store.dispatch(actions.changeArtistPlaylistAction(data))
//       const newTrack = randomNumber(data)
//       store.dispatch(actions.changeTrackAction(newTrack))
//       searchArtistInfo(newTrack)
//       DZ && DZ.player.playTracks([newTrack.id])
//     })
// }

// export function randomFlowTrack(props) {
//   const { flow, track } = props
//   store.dispatch(actions.prevTrackAction(track))
//   store.dispatch(actions.changeTrackAction(randomNumber(flow)))
//   searchArtistInfo(store.getState().track)
// }

// function fetchAlbumData(id) {
//   return (dispatch) =>
//     fetchJsonp(`https://api.deezer.com/album/${id}?output=jsonp`)
//       .then((response) => response.json())
//       .then(({ tracks: { data }, cover_xl: coverXl, cover_medium: coverMedium }) =>
//         dispatch(actions.changeTrackAction(randomNumber(data), coverXl, coverMedium))
//       )
// }

// export function randomAlbumTrack(props, albumID = null) {
//   const { album, track } = props
//   store.dispatch(actions.prevTrackAction(track))
//   store.dispatch(fetchAlbumData(albumID || album.id)).then(({ track }) => {
//     searchArtistInfo(track)
//     DZ && DZ.player.playTracks([track.id])
//   })
// }

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

export const randomPlaylistTrack: (state, dispatch: DispatchType, playlistID?: number) => void = (
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
