import { TrackType } from '../types/deezerData'

export type FlowActionType = {
  type: string
  payload: FlowStateType
}

export type FlowStateType = {
  data: Array<TrackType>
}

const contactsReducer: (state: FlowStateType, action: FlowActionType) => FlowStateType = (state, action) => {
  switch (action.type) {
    case 'FLOW':
      return action.payload
    default:
      return state
  }
}

export default contactsReducer
