export default function (state = [], { prev, type }) {
  switch (type) {
    case 'PREV_TRACK':
      let newState = [ ...state, prev ]
      if (state.length && prev.id && state.slice(-1)[0].id === newState.slice(-1)[0].id) {
        newState = state.filter(e => e.id !== newState.slice(-1)[0].id)
      }
      return prev.id ? newState : state
    default:
      return state
  }
}
