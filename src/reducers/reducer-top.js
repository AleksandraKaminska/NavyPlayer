export default function (state = {}, action) {
  switch (action.type) {
    case 'CHART':
      return action.top
    default:
      return state
  }
}
