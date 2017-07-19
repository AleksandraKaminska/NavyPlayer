export const searchConcertsAction = (concerts) => {
    return {
        type: 'FIND_CONCERTS',
        concerts
    }
};

export const searchArtistAction = (artistInfo) => {
    return {
        type: 'FIND_ARTIST',
        artistInfo
    }
};
