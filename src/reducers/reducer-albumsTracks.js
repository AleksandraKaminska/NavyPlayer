export default function (state = {}, action) {
  switch (action.type) {
    case 'FIND_ALBUMSTRACKS':
      return action.album
    default:
      return state
  }
}
