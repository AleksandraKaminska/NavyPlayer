export default function (state = {}, action) {
  switch (action.type) {
    case 'TOP':
      return action.top
    default:
      return state
  }
}
