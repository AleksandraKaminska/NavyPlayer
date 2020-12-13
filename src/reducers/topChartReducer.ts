import { TopChartType } from '../types/deezerData'

export type TopChartActionType = {
  type: string
  payload: TopChartType
}

const contactsReducer: (state: TopChartType, action: TopChartActionType) => TopChartType = (state, action) => {
  switch (action.type) {
    case 'TOP_CHART':
      return Object.keys(action.payload).reduce(
        (prev, key) => ({
          ...prev,
          [key]:
            prev && prev[key]
              ? {
                  data: [...prev[key].data, ...action.payload[key].data],
                  total: prev[key].total + action.payload[key].total
                }
              : action.payload[key]
        }),
        state
      )
    default:
      return state
  }
}

export default contactsReducer
