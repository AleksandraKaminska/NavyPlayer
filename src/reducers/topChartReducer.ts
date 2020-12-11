import { TopChartType } from '../types/deezerData'

export type TopChartActionType = {
  type: string
  payload: TopChartType
}

const contactsReducer: (state: TopChartType, action: TopChartActionType) => TopChartType = (state, action) => {
  switch (action.type) {
    case 'TOP_CHART':
      return action.payload
    default:
      return state
  }
}

export default contactsReducer
