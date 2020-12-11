import fetchJsonp from 'fetch-jsonp'
import { searchArtistInfo } from './search'
import { TrackType, AlbumType } from '../types/deezerData'
const { DZ } = window

type DispatchType = React.Dispatch<{ type: string; payload: any }>
