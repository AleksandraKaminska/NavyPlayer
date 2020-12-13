import albumsReducer from './albumsReducer'
import albumReducer from './albumReducer'
import artistReducer from './artistReducer'
import similarArtistsReducer from './similarArtistsReducer'
import artistPlaylistsReducer from './artistPlaylistsReducer'
import playlistReducer from './playlistReducer'
import trackReducer from './trackReducer'
import previousTracksReducer from './previousTracksReducer'
import flowReducer from './flowReducer'
import artistTrackListReducer from './artistTrackListReducer'
import topChartReducer from './topChartReducer'
import searchReducer, { SearchStateType } from './searchReducer'
import { ArtistType, AlbumType, TrackType, TopChartType, PlaylistType } from '../types/deezerData'

export type StateType = {
  album?: AlbumType
  albums?: Array<AlbumType>
  artist?: ArtistType
  playlist?: PlaylistType
  track?: TrackType
  artistPlaylists?: Array<any>
  similarArtists?: Array<ArtistType>
  previousTracks?: Array<TrackType>
  flow?: any
  artistTrackList?: any
  topChart?: TopChartType
  searchResults?: SearchStateType
}

export const initialState: StateType = {}

export const mainReducer: (state: any, action: any) => any = (state, action) => {
  // console.log(state)
  // console.log(action)
  return {
    album: albumReducer(state.album, action),
    albums: albumsReducer(state.albums, action),
    artist: artistReducer(state.artist, action),
    playlist: playlistReducer(state.playlist, action),
    track: trackReducer(state.track, action),
    artistPlaylists: artistPlaylistsReducer(state.artistPlaylists, action),
    similarArtists: similarArtistsReducer(state.similarArtists, action),
    previousTracks: previousTracksReducer(state.previousTracks, action),
    flow: flowReducer(state.flow, action),
    artistTrackList: artistTrackListReducer(state.artistTrackList, action),
    topChart: topChartReducer(state.topChart, action),
    searchResults: searchReducer(state.search, action)
  }
}
