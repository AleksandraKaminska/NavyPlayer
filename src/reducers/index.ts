import albumsReducer from './albumsReducer'
import albumReducer from './albumReducer'
import artistReducer from './artistReducer'
import similarArtistsReducer, { SimilarArtistStateType } from './similarArtistsReducer'
import artistPlaylistsReducer, { ArtistPlaylistsStateType } from './artistPlaylistsReducer'
import playlistReducer from './playlistReducer'
import trackReducer from './trackReducer'
import previousTracksReducer from './previousTracksReducer'
import flowReducer, { FlowStateType } from './flowReducer'
import artistTrackListReducer, { ArtistTrackListStateType } from './artistTrackListReducer'
import topChartReducer from './topChartReducer'
import searchReducer, { SearchStateType } from './searchReducer'
import { ArtistType, AlbumType, TrackType, TopChartType, PlaylistType } from '../types/deezerData'

export type StateType = {
  album?: AlbumType
  albums?: Array<AlbumType>
  artist?: ArtistType
  playlist?: PlaylistType
  track?: TrackType
  artistPlaylists?: ArtistPlaylistsStateType
  similarArtists?: SimilarArtistStateType
  previousTracks?: Array<TrackType>
  flow?: FlowStateType
  artistTrackList?: ArtistTrackListStateType
  topChart?: TopChartType
  searchResults?: SearchStateType
}

export const initialState: StateType = {}

export const reducer: (state: any, action: any) => any = (state, action) => {
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
