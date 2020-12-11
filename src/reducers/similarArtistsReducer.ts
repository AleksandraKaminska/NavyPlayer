import { ArtistType } from '../types/deezerData'

export type SimilarArtistActionType = {
  type: string
  payload: Array<ArtistType>
}

const similarArtistsReducer: (state: Array<ArtistType>, action: SimilarArtistActionType) => Array<ArtistType> = (
  state,
  action
) => {
  switch (action.type) {
    case 'FIND_SIMILAR_ARTISTS':
      return action.payload
    default:
      return state
  }
}

export default similarArtistsReducer
