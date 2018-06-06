export default function (state = [], action) {
  switch (action.type) {
    case 'FLOW':
      return action.data
    default:
      return state
  }
}
