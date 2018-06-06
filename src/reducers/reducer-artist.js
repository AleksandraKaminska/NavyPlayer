export default function (state = {}, { type, artist }) {
    switch (type) {
        case 'FIND_ARTIST':
            const { name, picture_small, id } = artist
            return { name, picture_small, id }
        default:
            return state
    }
}
