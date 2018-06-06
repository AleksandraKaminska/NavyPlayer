export default function (state = {}, { type, track, coverXl, coverMedium }) {
  switch (type) {
    case 'CHANGE_TRACK':
      return track.album ? { ...track } : { ...track, ...{ album: { cover_xl: coverXl, cover_medium: coverMedium } } }
    default:
      return state
  }
}
