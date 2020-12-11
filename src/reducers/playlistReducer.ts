import { PlaylistType } from '../types/deezerData'

export type PlaylistActionType = {
  type: string
  payload: PlaylistType['id']
}

const contactsReducer: (state: PlaylistType['id'], action: PlaylistActionType) => PlaylistType['id'] = (
  state,
  action
) => {
  switch (action.type) {
    case 'CHANGE_PLAYLIST':
      return action.payload
    default:
      return state
  }
}

export default contactsReducer
