export default function (state = {}, { type, artist }) {
  switch (type) {
    case 'FIND_ARTIST':
      const { name, picture_small: pictureSmall, id } = artist
      return { name, picture_small: pictureSmall, id }
    default:
      return state
  }
}
