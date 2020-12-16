import { ArtistType } from '../types/deezerData'

export type SimilarArtistActionType = {
  type: string
  payload: SimilarArtistStateType
}

export type SimilarArtistStateType = {
  data: Array<ArtistType>
  total: number
}

const similarArtistsReducer: (
  state: SimilarArtistStateType,
  action: SimilarArtistActionType
) => SimilarArtistStateType = (state, action) => {
  switch (action.type) {
    case 'FIND_SIMILAR_ARTISTS':
      return action.payload
    default:
      return state
  }
}

export default similarArtistsReducer
